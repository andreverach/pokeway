import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pokemon-list/pokemon-list.component'),
  },
  {
    path: 'detail/:pokemonName',
    loadComponent: () => import('./pokemon-detail/pokemon-detail.component'),
  },
] as Routes;
