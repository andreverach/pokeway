import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PokemonList } from '../interfaces/pokemonList';
import { environment } from '../../../environments/environment';
import { forkJoin, mergeMap, Observable, tap } from 'rxjs';
import { TypeList } from '../interfaces/typeList';
import { PokemonInfo } from '../interfaces/pokemonInfo';
import { LoadingService } from '../../shared/services/loading.service';
import { PokemonPaginationParams } from '../interfaces/pokemonPaginationParams';
import {
  POKEMON_PAGINATION_LIMIT,
  POKEMON_PAGINATION_OFFSET,
} from '../../shared/constants/pokemonPaginationParams';

@Injectable({
  providedIn: 'root',
})
export class PokemonStoreService {
  private httpClient = inject(HttpClient);
  private loadingService = inject(LoadingService);
  private baseUrl = environment.apiV2;
  pokemonList = signal<PokemonInfo[]>([]);
  typeFilters = signal<TypeList[]>([]);
  currentTypeFilter = signal<string>('');
  pokemonsListParams = signal<PokemonPaginationParams>({
    offset: POKEMON_PAGINATION_OFFSET,
    limit: POKEMON_PAGINATION_LIMIT,
  });
  incrementPokemonPaginationParams() {
    //incrementamos de manera que la siguiente peticion sera offset: cantidad actual osea el limit actual y el limit: sera más el limit constante
    //entonces en nua primera llamada sera lo predefinido offset: 0 y limit 10
    //incrementamos seria offset = al limit actual osea 10 y limit seria el limit actual mas el limit constante osea 10+10 = 20
    //incrementamos seria offset = al limit actual osea 20 y limit seria el limit actual mas el limit constante osea 20+10 = 30
    this.pokemonsListParams.update((prevState) => {
      prevState.offset = prevState.offset + POKEMON_PAGINATION_LIMIT;
      prevState.limit = prevState.limit;
      return prevState;
    });
  }
  resetPokemonPaginationParams() {
    this.pokemonsListParams.set({
      offset: POKEMON_PAGINATION_OFFSET,
      limit: POKEMON_PAGINATION_LIMIT,
    });
  }
  setCurrentTypeFilter(type: string) {
    this.currentTypeFilter.set(type);
  }
  getAllPokemons(): Observable<any> {
    const offset = this.pokemonsListParams().offset;
    const limit = this.pokemonsListParams().limit;
    const apiUrl: URL = new URL(
      `${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`
    );
    //console.log('se consulta la url normal: ', apiUrl.toString());
    //esta 3era version es pensando en que quiero reutilizar el codigo del agrupamiento de las llamadas para obtener la info del pokemon
    return this.httpClient.get<any>(apiUrl.toString()).pipe(
      mergeMap((response: any) => {
        //ahora solo llamo la funcion que he creado para que el tap reciba esa respuesta y asignarla al singal
        return this.getPokemonsInfo(response.results);
      }),
      tap((responseDetailed: PokemonInfo[]) => {
        if (offset === 0) {
          this.setPokemonList(responseDetailed);
        } else {
          this.addToPokemonList(responseDetailed);
        }
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
  getAllPokemonsByFilter(type: string): Observable<any> {
    //this.resetPokemonPaginationParams();
    const offset = this.pokemonsListParams().offset;
    const limit = this.pokemonsListParams().limit;
    const apiUrl: URL = new URL(`${this.baseUrl}type/${type}`);
    //console.log('se consulta x tipos url: ', apiUrl.toString());
    //esta 3era version es pensando en que quiero reutilizar el codigo del agrupamiento de las llamadas para obtener la info del pokemon
    return this.httpClient.get<any>(apiUrl.toString()).pipe(
      mergeMap((response: any) => {
        //ahora solo llamo la funcion que he creado para que el tap reciba esa respuesta y asignarla al singal
        /* console.log(
          'se obtienen los siguientes pokemon de este tipo: ',
          response.pokemon
        ); */
        const pokemonByFilter: PokemonList[] = response.pokemon
          .map((item: any) => {
            return item.pokemon;
          })
          .slice(offset, offset + limit);
        //console.log(`se hizo un slice de ${offset} y ${offset + limit}`);
        //console.log(`se obtuvo los siguientes: ${pokemonByFilter}`);
        if (pokemonByFilter.length === 0 && response.pokemon.length === 0) {
          //cuando en realidad no hay ninguno, porque a veces puede ser vacio pero porque al hacer el slice ya se paso y no encuentra nada pero si hubieron pokemons
          // hago esto porque al llegar vacio o un tipo que no tiene pokemones no llega a pasar al tap y no actualiza el pokemonList
          this.setPokemonList([]);
          return [];
        }
        return this.getPokemonsInfo(pokemonByFilter);
      }),
      tap((responseDetailed: PokemonInfo[]) => {
        if (offset === 0) {
          this.setPokemonList(responseDetailed);
        } else {
          this.addToPokemonList(responseDetailed);
        }
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

  addToPokemonList(pokemonInfo: PokemonInfo[]): void {
    //this.pokemonList.update((prevState) => prevState.concat(pokemonInfo));
    this.pokemonList.update((prevState) => [...prevState, ...pokemonInfo]);
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
