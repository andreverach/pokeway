import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PokemonList } from '../interfaces/pokemonList';
import { environment } from '../../../environments/environment';
import { forkJoin, mergeMap, Observable, tap } from 'rxjs';
import { TypeList } from '../interfaces/typeList';
import { PokemonInfo } from '../interfaces/pokemonInfo';

@Injectable({
  providedIn: 'root',
})
export class PokemonStoreService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiV2;
  pokemonList = signal<PokemonInfo[]>([]);
  typeFilters = signal<TypeList[]>([]);
  getAllPokemons(offset: number, limit: number): Observable<any> {
    const apiUrl: URL = new URL(
      `${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`
    );
    //esta 3era version es pensando en que quiero reutilizar el codigo del agrupamiento de las llamadas para obtener la info del pokemon
    return this.httpClient.get<any>(apiUrl.toString()).pipe(
      mergeMap((response: any) => {
        //ahora solo llamo la funcion que he creado para que el tap reciba esa respuesta y asignarla al singal
        return this.getPokemonsInfo(response.results);
      }),
      tap((responseDetailed: PokemonInfo[]) => {
        this.setPokemonList(responseDetailed);
      })
    );
  }
  getAllTypeFilters(): Observable<any> {
    const apiUrl: URL = new URL(`${this.baseUrl}type?limit=21`);
    return this.httpClient.get<any>(apiUrl.toString()).pipe(
      tap((response: any) => {
        this.typeFilters.update((prevState) => [...response.results]);
      })
    );
  }
  getAllPokemonsByFilter(
    type: string,
    offset: number,
    limit: number
  ): Observable<any> {
    const apiUrl: URL = new URL(`${this.baseUrl}type/${type}`);
    //esta 3era version es pensando en que quiero reutilizar el codigo del agrupamiento de las llamadas para obtener la info del pokemon
    return this.httpClient.get<any>(apiUrl.toString()).pipe(
      mergeMap((response: any) => {
        //ahora solo llamo la funcion que he creado para que el tap reciba esa respuesta y asignarla al singal
        const pokemonByFilter: PokemonList[] = response.pokemon
          .map((item: any) => {
            return item.pokemon;
          })
          .slice(offset, limit);
        if (pokemonByFilter.length === 0) {
          // hago esto porque al llegar vacio o un tipo que no tiene pokemones no llega a pasar al tap y no actualiza el pokemonList
          this.setPokemonList([]);
          return [];
        }
        return this.getPokemonsInfo(pokemonByFilter);
      }),
      tap((responseDetailed: PokemonInfo[]) => {
        this.setPokemonList(responseDetailed);
      })
    );
  }
  getPokemonsInfo(pokemonList: PokemonList[]): Observable<PokemonInfo[]> {
    const pokemonDetailsRequests = pokemonList.map((pokemon: PokemonList) => {
      return this.httpClient.get<any>(pokemon.url);
    });
    return forkJoin(pokemonDetailsRequests);
  }

  setPokemonList(pokemonInfo: PokemonInfo[]): void {
    this.pokemonList.update((prevState) => [...pokemonInfo]);
  }
}

//ahora en este caso lo que quiero es hacer una peticion por cada resultado lo que me obliga a agrupar peticiones para obtener ese resultado final
/* return this.httpClient.get<any>(apiUrl.toString()).pipe(
      mergeMap((response: any) => {
        // Creamos un array de observables para cada petición adicional
        const pokemonDetailsRequests = response.results.map(
          (pokemon: PokemonList) => {
            return this.httpClient.get<any>(pokemon.url);
          }
        );
        // Usamos forkJoin para ejecutar todas las peticiones agrupadas en pokemonDetailsRequests de manera paralela
        return forkJoin(pokemonDetailsRequests);
      }),
      map((responsePokemonDetailsRequests) => {
        return responsePokemonDetailsRequests as PokemonInfo[];
      }),
      tap((responseDetailed: PokemonInfo[]) => {
        this.pokemonList.update((prevState) => responseDetailed);
        console.log(this.pokemonList());
      })
    ); */

//este caso seria uno normal donde con tap puedo hacer cosas y retornare los datos, en este caso queria setear el signal pokemonList para que ya este disponible
/* return this.httpClient.get<any>(apiUrl.toString()).pipe(
      tap((response: any) => {
        this.pokemonList.update((prevState) => response.results);
        console.log(this.pokemonList())
      })
    ); */
