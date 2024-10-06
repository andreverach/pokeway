import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonStoreService } from './core/services/pokemon-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'pokeway';
  pokemonStoreService = inject(PokemonStoreService);

  ngOnInit() {
    this.pokemonStoreService.getAllPokemons().subscribe();
    this.pokemonStoreService.getAllTypeFilters().subscribe();
    //tambien llamar al servicio que me trae todos los nombres de los pokemons para ponerlos en la caja donde se buscaran pokemons como resultados
    //asi como una lista de resultados de busqueda y al elegir uno ya se hace toda la cosa
  }
}
