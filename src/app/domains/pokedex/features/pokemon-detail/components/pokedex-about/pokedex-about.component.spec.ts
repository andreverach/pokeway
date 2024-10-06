import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexAboutComponent } from './pokedex-about.component';

describe('PokedexAboutComponent', () => {
  let component: PokedexAboutComponent;
  let fixture: ComponentFixture<PokedexAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
