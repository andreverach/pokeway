import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  //loading para cuando se cargan pokemones por primera vez o cuando se filtran
  pokemonsLoader = signal<boolean>(false);
  showPokemonsLoader() {
    this.pokemonsLoader.set(true);
  }
  hidePokemonsLoader() {
    this.pokemonsLoader.set(false);
  }

  //loader para cuando se van agregar pokemones a la lista actual, osea cargar más
  pokemonsLoaderMore = signal<boolean>(false);
  showPokemonsLoaderMore() {
    this.pokemonsLoaderMore.set(true);
  }
  hidePokemonsLoaderMore() {
    this.pokemonsLoaderMore.set(false);
  }
}
