import { Component, computed, input } from '@angular/core';
import { Sprites } from '../../../../../../core/interfaces/pokemonInfo';

@Component({
  selector: 'app-pokedex-gallery',
  standalone: true,
  imports: [],
  templateUrl: './pokedex-gallery.component.html',
  styleUrl: './pokedex-gallery.component.scss',
})
export class PokedexGalleryComponent {
  spritesInfo = input<Sprites | null>(null);
  largeImages = computed(() => {
    const images: any[] = [];
    if (this.spritesInfo()?.other.dream_world.front_default) {
      images.push({
        url: this.spritesInfo()?.other.dream_world.front_default,
        alt: 'dream_world-front_default',
      });
    }
    if (this.spritesInfo()?.other.home.front_default) {
      images.push({
        url: this.spritesInfo()?.other.home.front_default,
        alt: 'home-front_default',
      });
    }
    return images;
  });
  smallImages = computed(() => {
    const images: any[] = [];
    if (this.spritesInfo()?.front_default) {
      images.push({
        url: this.spritesInfo()?.front_default,
        alt: 'front_default',
      });
    }
    if (this.spritesInfo()?.back_default) {
      images.push({
        url: this.spritesInfo()?.back_default,
        alt: 'back_default',
      });
    }
    if (this.spritesInfo()?.other.showdown.front_default) {
      images.push({
        url: this.spritesInfo()?.other.showdown.front_default,
        alt: 'showdown-front_default',
      });
    }
    if (this.spritesInfo()?.other.showdown.back_default) {
      images.push({
        url: this.spritesInfo()?.other.showdown.back_default,
        alt: 'showdown-back_default',
      });
    }
    return images;
  });
}
