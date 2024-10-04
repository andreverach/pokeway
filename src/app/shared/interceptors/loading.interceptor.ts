import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';
import { PokemonStoreService } from '../../core/services/pokemon-store.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const pokemonStoreService = inject(PokemonStoreService);
  // Acceder a la URL completa que incluye los query params
  //const urlWithParams = req.urlWithParams;
  //console.log(urlWithParams)
  // Crear un objeto URLSearchParams a partir de la URL
  //const queryParams = new URLSearchParams(urlWithParams.split('?')[1]);
  //console.log(queryParams)
  // Obtener un parámetro en particular
  //const offset = queryParams.get('offset');
  //console.log(Number(offset), typeof Number(offset));
  const offset = pokemonStoreService.pokemonsListParams().offset;
  //console.log('offset', offset);
  if (offset > 0) {
    loadingService.showPokemonsLoaderMore();
  } else {
    loadingService.showPokemonsLoader();
  }
  return next(req).pipe(
    finalize(() => {
      if (offset > 0) {
        loadingService.hidePokemonsLoaderMore();
      } else {
        loadingService.hidePokemonsLoader();
      }
    })
  );
};
