import { Species } from './pokemonInfo';

export interface EvolutionChainInfo {
  chain: Chain;
  id: number;
}

//cadena de evolucion desde aqui el specie es el inicial
export interface Chain {
  evolves_to: EvolvesTo[]; //se itera este objeto para saber que más evoluciones tiene
  species: Species;
}

//es la evolucion y en especie se ve quien es, se itera este objeto para saber que más evoluciones tiene
export interface EvolvesTo {
  evolution_details: EvolutionDetail;
  evolves_to: EvolvesTo[];
  species: Species;
}

export interface EvolutionDetail {
  item: ItemEvolution; //el item que se necesita para evolucionar
  trigger: TriggerEvolution; //es la accion que evoliciona: subir level - usar un item
}

export interface TriggerEvolution {
  name: string; //es la accion que evoliciona: subir level - usar un item
  url: string;
}

export interface ItemEvolution {
  name: string; //el item que se necesita para evolucionar
  url: string;
}
