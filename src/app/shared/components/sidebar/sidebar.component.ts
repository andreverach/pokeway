import { Component, computed, inject } from '@angular/core';
import { PokemonStoreService } from '../../../core/services/pokemon-store.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  typeFilters = computed(() => {
    return this.pokemonStoreService.typeFilters();
  });
  pokemonStoreService = inject(PokemonStoreService);

  filterByType(type: string) {
    this.pokemonStoreService.getAllPokemonsByFilter(type, 0, 10).subscribe();
  }
}
