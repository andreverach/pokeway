import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListCardComponent } from './pokemon-list-card.component';

describe('PokemonListCardComponent', () => {
  let component: PokemonListCardComponent;
  let fixture: ComponentFixture<PokemonListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
