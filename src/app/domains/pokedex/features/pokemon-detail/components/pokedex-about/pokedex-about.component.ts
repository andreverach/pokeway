import { Component, input } from '@angular/core';
import { PokemonInfo } from '../../../../../../core/interfaces/pokemonInfo';

@Component({
  selector: 'app-pokedex-about',
  standalone: true,
  imports: [],
  templateUrl: './pokedex-about.component.html',
  styleUrl: './pokedex-about.component.scss'
})
export class PokedexAboutComponent {
  pokemonData = input<PokemonInfo | null>(null);
}
