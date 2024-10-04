import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { TypeList } from '../../../core/interfaces/typeList';
import { PokemonStoreService } from '../../../core/services/pokemon-store.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss',
})
export class SidebarMobileComponent {
  @Input() showSideBarMenu = signal(false);
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  typeFilters = computed(() => {
    return this.pokemonStoreService.typeFilters();
  });
  pokemonStoreService = inject(PokemonStoreService);
  toggleSidebarMenu(): void {
    this.toggle.emit(!this.showSideBarMenu);
  }
  filterByType(type: string) {
    this.pokemonStoreService.setCurrentTypeFilter(type);
    this.pokemonStoreService.getAllPokemonsByFilter(type).subscribe();
    this.toggleSidebarMenu();
  }
}
