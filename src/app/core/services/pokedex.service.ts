import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { environment } from '../../../environments/environment';
import { PokemonInfo } from '../interfaces/pokemonInfo';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { PokedexInfo } from '../interfaces/pokedexInfo';
import { SpecieInfo } from '../interfaces/specieInfo';
import {
  Chain,
  EvolutionChainInfo,
  PokemonEvolution,
} from '../interfaces/evolutionChainInfo';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private httpClient = inject(HttpClient);
  //private loadingService = inject(LoadingService);
  private baseUrl = environment.apiV2;

  //request
  getPokemonInfo(pokemon: string): Observable<PokemonInfo> {
    const apiUrl: URL = new URL(`${this.baseUrl}pokemon/${pokemon}`);
    //console.log('se consulta la url normal: ', apiUrl.toString());
    //esta 3era version es pensando en que quiero reutilizar el codigo del agrupamiento de las llamadas para obtener la info del pokemon
    //this.showLoading(offset);
    return this.httpClient
      .get<PokemonInfo>(apiUrl.toString())
      .pipe
      //finalize(() => this.hideLoading(offset))
      ();
  }

  getExtraInfo(pokemonInfo: PokemonInfo): Observable<PokedexInfo> {
    const specieUrl: URL = new URL(`${pokemonInfo.species.url}`);
    //this.showLoading(offset);
    return this.httpClient.get<SpecieInfo>(specieUrl.toString()).pipe(
      mergeMap((specieResponse: SpecieInfo) => {
        const evolutionUrl: URL = new URL(
          `${specieResponse.evolution_chain.url}`
        );
        return this.httpClient.get<EvolutionChainInfo>(`${evolutionUrl}`).pipe(
          mergeMap((evolutionChainResponse: EvolutionChainInfo) => {
            return this.getEvolutionChainGallery(
              pokemonInfo,
              evolutionChainResponse
            ).pipe(
              map((pokemonEvolutionInfo: PokemonInfo[]) => {
                //completamos la lista de evoluciones con la info que tenemos del pokemon que tenemos
                pokemonEvolutionInfo.push(pokemonInfo);
                const evolutions = this.recursiveEvolutionMap(
                  evolutionChainResponse.chain
                );
                evolutions.map((evolution) => {
                  const pokemon = pokemonEvolutionInfo.find(
                    (pokemon) => pokemon.name === evolution.name
                  );
                  evolution.image =
                    pokemon?.sprites.other.dream_world.front_default || '';
                  return evolution;
                });
                evolutionChainResponse.chainGallery = evolutions;
                return {
                  specieInfo: specieResponse,
                  evolutionChainInfo: evolutionChainResponse,
                };
              })
            );
          })
        );
      })
      //finalize(() => this.hideLoading(offset))
    );
  }

  private getEvolutionChainGallery(
    fromPokemon: PokemonInfo,
    evolutionChain: EvolutionChainInfo
  ): Observable<PokemonInfo[]> {
    const pokemonEvolution: PokemonEvolution[] = this.recursiveEvolutionMap(
      evolutionChain.chain
    );
    const evolutionChainRequests: any[] = [];
    pokemonEvolution.forEach((pokemon: PokemonEvolution, index: number) => {
      if (fromPokemon.name !== pokemon.name) {
        evolutionChainRequests.push(
          this.httpClient.get<any>(`${this.baseUrl}pokemon/${pokemon.name}`)
        );
        //evolutionChainRequests.push(`${this.baseUrl}pokemon/${pokemon.name}`)
      }
    });
    return forkJoin(evolutionChainRequests);
  }

  private recursiveEvolutionMap(chain: Chain): PokemonEvolution[] {
    const pokemonEvolutionGallery: PokemonEvolution[] = [];
    pokemonEvolutionGallery.push({
      image: '',
      name: chain.species.name,
      trigger:
        (chain.evolution_details.length > 0 &&
          chain.evolution_details[0].trigger.name) ||
        '',
      item:
        (chain.evolution_details.length > 0 &&
          chain.evolution_details[0].item?.name) ||
        '',
    });
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      //return this.recursiveEvolutionMap(chain.evolves_to[0]);
      return pokemonEvolutionGallery.concat(
        this.recursiveEvolutionMap(chain.evolves_to[0])
      );
    } else {
      return pokemonEvolutionGallery;
    }
  }
}
