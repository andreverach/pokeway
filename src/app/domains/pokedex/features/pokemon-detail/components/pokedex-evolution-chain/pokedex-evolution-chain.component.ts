import { Component, input } from '@angular/core';
import { EvolutionChainInfo } from '../../../../../../core/interfaces/evolutionChainInfo';
import { EVOLUTION_CHAIN_INFO_EMPTY } from '../../../../../../shared/constants/evolutionChainInfo.constant';

@Component({
  selector: 'app-pokedex-evolution-chain',
  standalone: true,
  imports: [],
  templateUrl: './pokedex-evolution-chain.component.html',
  styleUrl: './pokedex-evolution-chain.component.scss',
})
export class PokedexEvolutionChainComponent {
  evolutionData = input<EvolutionChainInfo>(EVOLUTION_CHAIN_INFO_EMPTY);
  refreshInfo(pokemonName: string) {
    //console.log('pokemonName => ', pokemonName);
  }
}
