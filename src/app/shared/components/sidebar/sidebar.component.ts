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
  typeSelected = computed(() => {
    return this.pokemonStoreService.currentTypeFilter();
  });
  filterByType(type: string) {
    this.pokemonStoreService.setCurrentTypeFilter(type);
    this.pokemonStoreService.resetPokemonPaginationParams();
    this.pokemonStoreService.getAllPokemonsByFilter(type).subscribe();
  }
}
