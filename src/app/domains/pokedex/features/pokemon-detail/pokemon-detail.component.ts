import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { map } from 'rxjs';
import { PokemonInfo } from '../../../../core/interfaces/pokemonInfo';
import { PokemonStoreService } from '../../../../core/services/pokemon-store.service';
import { UpperCasePipe } from '@angular/common';
import { NO_POKEMON_SEARCHED } from '../../../../shared/constants/noPokemon';
import { PokedexAboutComponent } from './components/pokedex-about/pokedex-about.component';
import { PokedexStatsComponent } from './components/pokedex-stats/pokedex-stats.component';
import { PokedexGalleryComponent } from './components/pokedex-gallery/pokedex-gallery.component';
import { PokedexEvolutionChainComponent } from './components/pokedex-evolution-chain/pokedex-evolution-chain.component';
import { SpecieInfo } from '../../../../core/interfaces/specieInfo';
import { EvolutionChainInfo } from '../../../../core/interfaces/evolutionChainInfo';

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
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export default class PokemonDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pokemonNameParam$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('pokemonName'))
  );
  private readonly pokemonStoreService = inject(PokemonStoreService);
  pokemonData = signal<PokemonInfo | null>(null);
  specieData = signal<SpecieInfo | null>(null);
  evolutionData = signal<EvolutionChainInfo | null>(null);
  ngOnInit(): void {
    //en caso de no encontrar pokemon puede que sea porque directamente vino a esta pagina y aun no se ha llenado el signal de los pokemones
    //entonces mostrar la caja de busqueda o siempre que este la caja
    //entonces si hay un nombre hay que setear la caja con ese nombre y buscar al pokemon con un servicio
    //si no hay nombre entonces recien buscar cuando se escriba algun nombre en la caja
    this.pokemonNameParam$.subscribe((nameParam) => {
      if (nameParam === NO_POKEMON_SEARCHED) {
        //se debe habilitar la busqueda de pokemon
        //se busca al pokemon y se trae toda la info extra
        console.log('NO_POKEMON_SEARCHED => ', nameParam);
      }
      if (nameParam) {
        //se debe habilitar la busqueda de pokemon tambien para que navegue entre pokemons
        //ya se tiene info el pokemon solo traer la extra
        console.log('POKEMON_SEARCHED => ', nameParam);
        const pokemonFounded = this.pokemonStoreService
          .pokemonList()
          .find((pokemon) => pokemon.name === nameParam);
        //console.log('pokemonFounded', pokemonFounded);
        if (pokemonFounded) {
          this.pokemonData.set(pokemonFounded);
          console.log('pokemonFounded', this.pokemonData());
        } else {
          //se debe habilitar la busqueda de pokemon
          //se busca al pokemon y se trae toda la info extra
          console.log('NO_POKEMON_SEARCHED => ', nameParam);
        }
      }
    });
  }
}
//https://angular.love/angular-router-everything-you-need-to-know-about
//location.reload(true);
//graficos ng2chart tiene radar
