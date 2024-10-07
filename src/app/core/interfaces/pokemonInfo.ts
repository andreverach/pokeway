export interface PokemonInfo {
  name: string;
  order: number;
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  weight: number;
  species: Species;
  sprites: Sprites;
  abilities: Ability[];
  stats: Statistic[];
  types: Type[];
  cries: Cries; //cries son los sonidos que hace
}

export interface PokemonAutoCompleteItem {
  name: string;
  url: string;
}


export interface Cries {
  latest: string;
  legacy: string;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  back_default: string;
  front_default: string;
  other: Other;
}

export interface Other {
  dream_world: DreamWorld;
  showdown: Showdown;
  home: OtherHomeImage;
}
export interface OtherHomeImage {
  front_default: string;
}
export interface OficialArtWork {
  front_default: string;
}
export interface DreamWorld {
  front_default: string;
}

export interface Showdown {
  back_default: string;
  front_default: string;
}

export interface Ability {
  ability: AbilityInfo;
  is_hidden: boolean;
  slot: number;
}

export interface AbilityInfo {
  name: string;
  url: string;
}
export interface Statistic {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: PokemonType;
}

export interface PokemonType {
  name: string;
  url: string;
}
