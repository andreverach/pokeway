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
  }
}
