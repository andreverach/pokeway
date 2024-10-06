import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexEvolutionChainComponent } from './pokedex-evolution-chain.component';

describe('PokedexEvolutionChainComponent', () => {
  let component: PokedexEvolutionChainComponent;
  let fixture: ComponentFixture<PokedexEvolutionChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexEvolutionChainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexEvolutionChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
