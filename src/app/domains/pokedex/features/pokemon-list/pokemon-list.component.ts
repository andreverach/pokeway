import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SidebarMobileComponent } from '../../../../shared/components/sidebar-mobile/sidebar-mobile.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { PokemonListCardComponent } from './components/pokemon-list-card/pokemon-list-card.component';
import { PokemonStoreService } from '../../../../core/services/pokemon-store.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { PokeballLoaderComponent } from '../../../../shared/components/pokeball-loader/pokeball-loader.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    SidebarMobileComponent,
    SidebarComponent,
    PokemonListCardComponent,
    PokeballLoaderComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export default class PokemonListComponent {
  sidebarMobile = signal(false);
  pokemonStoreService = inject(PokemonStoreService);
  pokemons = computed(() => {    
    return this.pokemonStoreService.pokemonList().length === 0
      ? []
      : this.pokemonStoreService.pokemonList();
  });
  private readonly loadingService = inject(LoadingService);
  pokemonsLoading = this.loadingService.pokemonsLoader;
  pokemonsLoadingMore = this.loadingService.pokemonsLoaderMore;
  toggleSidebarMenu() {
    this.sidebarMobile.update((prevState) => !prevState);
  }
  loadMorePokemons() {
    //si existe tipo entonces llamar al typefilter
    //si no existe tipo entonces llamar al get all
    this.pokemonStoreService.incrementPokemonPaginationParams();
    if (this.pokemonStoreService.currentTypeFilter() !== '') {
      this.pokemonStoreService
        .getAllPokemonsByFilter(this.pokemonStoreService.currentTypeFilter())
        .subscribe();
    } else {
      this.pokemonStoreService.getAllPokemons().subscribe();
    }
  }
}
