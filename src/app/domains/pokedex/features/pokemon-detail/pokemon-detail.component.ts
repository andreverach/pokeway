import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PokemonInfo } from '../../../../core/interfaces/pokemonInfo';
import { PokemonStoreService } from '../../../../core/services/pokemon-store.service';
import { UpperCasePipe } from '@angular/common';
import { NO_POKEMON_PARAM } from '../../../../shared/constants/noPokemon';
import { PokedexAboutComponent } from './components/pokedex-about/pokedex-about.component';
import { PokedexStatsComponent } from './components/pokedex-stats/pokedex-stats.component';
import { PokedexGalleryComponent } from './components/pokedex-gallery/pokedex-gallery.component';
import { PokedexEvolutionChainComponent } from './components/pokedex-evolution-chain/pokedex-evolution-chain.component';
import { SpecieInfo } from '../../../../core/interfaces/specieInfo';
import { EvolutionChainInfo } from '../../../../core/interfaces/evolutionChainInfo';
import { PokedexService } from '../../../../core/services/pokedex.service';
import { PokedexInfo } from '../../../../core/interfaces/pokedexInfo';
import { SPECIE_INFO_EMPTY } from '../../../../shared/constants/specieInfo.constant';
import { ClearTextDescriptionPipe } from '../../../../shared/pipes/clear-text-description.pipe';
import { EVOLUTION_CHAIN_INFO_EMPTY } from '../../../../shared/constants/evolutionChainInfo.constant';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    UpperCasePipe,
    PokedexAboutComponent,
    PokedexStatsComponent,
    PokedexGalleryComponent,
    PokedexEvolutionChainComponent,
    ClearTextDescriptionPipe,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export default class PokemonDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pokedexService = inject(PokedexService);
  private readonly pokemonNameParam$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('pokemonName'))
  );
  private readonly pokemonStoreService = inject(PokemonStoreService);
  pokemonData = signal<PokemonInfo | null>(null);
  specieData = signal<SpecieInfo>(SPECIE_INFO_EMPTY);
  evolutionData = signal<EvolutionChainInfo>(EVOLUTION_CHAIN_INFO_EMPTY);
  ngOnInit(): void {
    //en caso de no encontrar pokemon puede que sea porque directamente vino a esta pagina y aun no se ha llenado el signal de los pokemones
    //entonces mostrar la caja de busqueda o siempre que este la caja
    //entonces si hay un nombre hay que setear la caja con ese nombre y buscar al pokemon con un servicio
    //si no hay nombre entonces recien buscar cuando se escriba algun nombre en la caja
    this.pokemonNameParam$.subscribe((nameParam) => {
      if (nameParam === NO_POKEMON_PARAM) {
        //se debe habilitar la busqueda de pokemon
        //se busca al pokemon y se trae toda la info extra
        //incluso este if no iria ya que el servicio y logica iria en una fnucion por abajo que se llamaria al buscar desde la caja
        //enviando el nombre y trayendo toda la data
        //console.log('NO_POKEMON_PARAM => ', nameParam);
      }
      if (nameParam) {
        //se debe habilitar la busqueda de pokemon tambien para que navegue entre pokemons
        //ya se tiene info el pokemon solo traer la extra
        //console.log('POKEMON_PARAM => ', nameParam);
        const pokemonFounded = this.pokemonStoreService
          .pokemonList()
          .find((pokemon) => pokemon.name === nameParam);
        //console.log('pokemonFounded', pokemonFounded);
        if (pokemonFounded) {
          this.pokemonData.set(pokemonFounded);
          this.pokedexService
            .getExtraInfo(pokemonFounded)
            .subscribe((pokedexInfo: PokedexInfo) => {
              //console.log('pokedexInfo', pokedexInfo);
              this.specieData.set(pokedexInfo.specieInfo);
              this.evolutionData.set(pokedexInfo.evolutionChainInfo);
            });
        } else {
          //se debe habilitar la busqueda de pokemon
          //se busca al pokemon y se trae toda la info extra
          //console.log('pokemonNotFounded => ', nameParam);
          this.pokedexService
            .getPokemonInfo(nameParam)
            .pipe(
              switchMap((pokemon) => {
                this.pokemonData.set(pokemon);
                return this.pokedexService.getExtraInfo(pokemon);
              })
            )
            .subscribe((pokedexInfo: PokedexInfo) => {
              console.log('pokedexInfo', pokedexInfo);
              this.specieData.set(pokedexInfo.specieInfo);
              this.evolutionData.set(pokedexInfo.evolutionChainInfo);
            });
        }
      }
    });
  }

  getPokedexInfo() {}
}
//https://angular.love/angular-router-everything-you-need-to-know-about
//location.reload(true);
//graficos ng2chart tiene radar
