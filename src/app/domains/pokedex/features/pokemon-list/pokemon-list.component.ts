import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SidebarMobileComponent } from '../../../../shared/components/sidebar-mobile/sidebar-mobile.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { PokemonListCardComponent } from './components/pokemon-list-card/pokemon-list-card.component';
import { PokemonStoreService } from '../../../../core/services/pokemon-store.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    SidebarMobileComponent,
    SidebarComponent,
    PokemonListCardComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export default class PokemonListComponent {
  sidebarMobile = signal(false);
  pokemonStoreService = inject(PokemonStoreService);
  pokemons = computed(() => {
    console.log(this.pokemonStoreService.pokemonList().length);
    return this.pokemonStoreService.pokemonList().length === 0
      ? []
      : this.pokemonStoreService.pokemonList();
  });
  toggleSidebarMenu() {
    this.sidebarMobile.update((prevState) => !prevState);
  }
}
