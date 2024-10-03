import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  pokemonsLoader = signal<boolean>(false);

  showPokemonsLoader() {
    this.pokemonsLoader.set(true);
  }
  hidePokemonsLoader() {
    this.pokemonsLoader.set(false);
  }
}
