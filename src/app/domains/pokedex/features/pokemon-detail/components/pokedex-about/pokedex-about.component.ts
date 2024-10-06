import { Component, input } from '@angular/core';
import { PokemonInfo } from '../../../../../../core/interfaces/pokemonInfo';
import { SpecieInfo } from '../../../../../../core/interfaces/specieInfo';
import { SPECIE_INFO_EMPTY } from '../../../../../../shared/constants/specieInfo.constant';
import { UpperCasePipe } from '@angular/common';
import { RomanToNumberPipe } from '../../../../../../shared/pipes/roman-to-number.pipe';

@Component({
  selector: 'app-pokedex-about',
  standalone: true,
  imports: [UpperCasePipe, RomanToNumberPipe],
  templateUrl: './pokedex-about.component.html',
  styleUrl: './pokedex-about.component.scss',
})
export class PokedexAboutComponent {
  pokemonData = input<PokemonInfo | null>(null);
  specieData = input<SpecieInfo>(SPECIE_INFO_EMPTY);
}
