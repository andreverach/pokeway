import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { environment } from '../../../environments/environment';
import { PokemonInfo } from '../interfaces/pokemonInfo';
import { map, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { PokedexInfo } from '../interfaces/pokedexInfo';
import { SpecieInfo } from '../interfaces/specieInfo';
import { EvolutionChainInfo } from '../interfaces/evolutionChainInfo';

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
    return this.httpClient.get<PokemonInfo>(apiUrl.toString()).pipe(      
      //finalize(() => this.hideLoading(offset))
    );
  }

  getExtraInfo(url: string): Observable<PokedexInfo> {
    const specieUrl: URL = new URL(`${url}`);
    //this.showLoading(offset);
    return this.httpClient.get<SpecieInfo>(specieUrl.toString()).pipe(
      mergeMap((specieResponse: SpecieInfo) => {
        const evolutionUrl: URL = new URL(
          `${specieResponse.evolution_chain.url}`
        );
        return this.httpClient.get<EvolutionChainInfo>(`${evolutionUrl}`).pipe(
          map((evolutionChainResponse: EvolutionChainInfo) => {
            return {
              specieInfo: specieResponse,
              evolutionChainInfo: evolutionChainResponse,
            };
          })
        );
      })
      //finalize(() => this.hideLoading(offset))
    );
  }
}
