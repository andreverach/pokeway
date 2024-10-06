//Specie me da la cadena de evolucion
// --- Cadena de evolucion me da la info de toda la cadena, se puede ir buscando por cada nombre el detalle de cada pokemon, y asi traer sus fotos para mostrar
//Specie da desde quien evoluciona en caso este sea ya una evoluicon - se puede sacar nada mas de la cadrna de evolucion
//Specie me da su geenracion
//Specie tmb indica si es legendario
//Specie tamb me da un texto, elegir eso para poner
export interface SpecieInfo {
  evolution_chain: EvolutionChain;
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  order: number;
}

export interface EvolutionChain {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
}

export interface Generation {
  name: string;
  url: string;
}
