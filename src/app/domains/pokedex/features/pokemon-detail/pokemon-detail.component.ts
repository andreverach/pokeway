import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export default class PokemonDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly customerId$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('pokemonName'))
  );
  ngOnInit(): void {
    const pokemonName = this.activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('pokemonName'))
    );
    console.log('pokemonName ====> ', pokemonName);
    this.customerId$.subscribe((value) =>
      console.log('pokemonName2 => ', value)
    );
  }
}
//https://angular.love/angular-router-everything-you-need-to-know-about
