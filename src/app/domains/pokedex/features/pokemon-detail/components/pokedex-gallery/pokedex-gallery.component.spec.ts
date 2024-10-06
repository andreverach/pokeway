import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexGalleryComponent } from './pokedex-gallery.component';

describe('PokedexGalleryComponent', () => {
  let component: PokedexGalleryComponent;
  let fixture: ComponentFixture<PokedexGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
