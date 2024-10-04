import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pokemon-list/pokemon-list.component'),
  },
  {
    path: 'pokedex/:pokemonName',
    loadComponent: () => import('./pokemon-detail/pokemon-detail.component'),
  },
] as Routes;
