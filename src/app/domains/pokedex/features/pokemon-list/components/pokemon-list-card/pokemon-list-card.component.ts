import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonInfo } from '../../../../../../core/interfaces/pokemonInfo';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../../../shared/services/loading.service';

@Component({
  selector: 'app-pokemon-list-card',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './pokemon-list-card.component.html',
  styleUrl: './pokemon-list-card.component.scss',
})
export class PokemonListCardComponent {
  pokemonInfo = input<PokemonInfo>();
  private readonly router = inject(Router);
  showPokemonDetailed() {
    this.router.navigate(['pokedex', this.pokemonInfo()?.name]);
    /**
     * this.router.navigate(['users', userId, 'orders'], {
      queryParams: { showCompletedOrders: true },
    });
     */
  }
}
