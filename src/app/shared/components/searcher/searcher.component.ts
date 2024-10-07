import {
  Component,
  computed,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { PokemonStoreService } from '../../../core/services/pokemon-store.service';
import { PokemonAutoCompleteItem } from '../../../core/interfaces/pokemonInfo';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent implements OnInit {
  private readonly pokemonStoreService = inject(PokemonStoreService);
  allPokemons = computed(() => {
    return this.pokemonStoreService.pokemonAutoCompleteList().length === 0
      ? []
      : this.pokemonStoreService.pokemonAutoCompleteList();
  }); // Aquí debe estar la lista completa de pokemones
  filteredPokemons: PokemonAutoCompleteItem[] = [];
  searchForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  unsuscribeObservables$: Subject<boolean> = new Subject();
  isSomePokemonSelected = signal<boolean>(false);
  @Output() triggerPokemonSelected: EventEmitter<string> =
    new EventEmitter<string>();
  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.controlPokemonNameField?.valueChanges
      .pipe(
        takeUntil(this.unsuscribeObservables$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchText) => {
        this.filteredPokemons = [];

        if (this.isSomePokemonSelected()) {
          this.isSomePokemonSelected.set(false);
          return;
        }

        if (searchText && searchText !== '') {
          this.showAlternatives(searchText);
        }
      });
  }
  ngOnDestroy(): void {
    this.unsuscribeObservables$.next(true);
    this.unsuscribeObservables$.complete();
  }
  buildForm() {
    this.searchForm = this.formBuilder.group({
      pokemonName: [''],
    });
  }
  get controlPokemonNameField() {
    return this.searchForm.get('pokemonName');
  }

  // Método para filtrar y mostrar sugerencias
  showAlternatives(searchTerm: string) {
    this.filteredPokemons = this.allPokemons()
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 7);
  }

  selectPokemon(pokemon: PokemonAutoCompleteItem) {
    this.controlPokemonNameField?.setValue(pokemon.name);
    this.filteredPokemons = [];
    this.isSomePokemonSelected.set(true);
    this.showPokemonDetails(pokemon.name);
  }

  searchPokemon() {
    if (this.searchForm.value && this.searchForm.value.pokemonName) {
      this.showPokemonDetails(this.searchForm.value.pokemonName);
    }
  }
  showPokemonDetails(pokemon: string) {
    this.triggerPokemonSelected.emit(pokemon);
  }
}
