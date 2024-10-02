export interface TypeInfo {
  damage_relations: DamageRelations;
  id: number;
  name: string;
}

export interface DamageRelations {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: DoubleDamageTo[];
  half_damage_from: HalfDamageFrom[];
  half_damage_to: HalfDamageTo[];
  no_damage_from: NoDamageFrom[];
  no_damage_to: NoDamageTo[];
}

export interface DoubleDamageFrom {
  name: string;
  url: string;
}

export interface DoubleDamageTo {
  name: string;
  url: string;
}

export interface HalfDamageFrom {
  name: string;
  url: string;
}

export interface HalfDamageTo {
  name: string;
  url: string;
}

export interface NoDamageFrom {
  name: string;
  url: string;
}

export interface NoDamageTo {
  name: string;
  url: string;
}
