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
  ability: Ability[];
  stats: Statistic[];
  types: Type[];
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  other: Other;
}

export interface Other {
  dream_world: DreamWorld;
  showdown: Showdown;
}

export interface DreamWorld {
  front_default: string;
  front_female: any;
}

export interface Showdown {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
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
