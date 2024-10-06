import { Component } from '@angular/core';

@Component({
  selector: 'app-pokedex-evolution-chain',
  standalone: true,
  imports: [],
  templateUrl: './pokedex-evolution-chain.component.html',
  styleUrl: './pokedex-evolution-chain.component.scss',
})
export class PokedexEvolutionChainComponent {
  refreshInfo(pokemonName: string) {
    console.log('pokemonName => ', pokemonName);
  }
}
