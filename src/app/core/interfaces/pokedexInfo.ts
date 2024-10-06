import { EvolutionChainInfo } from './evolutionChainInfo';
import { PokemonInfo } from './pokemonInfo';
import { SpecieInfo } from './specieInfo';

export interface PokedexInfo {
  //pokemonInfo: PokemonInfo;
  specieInfo: SpecieInfo;
  evolutionChainInfo: EvolutionChainInfo;
}
