import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListeComponent } from './pokemon-liste.component';

describe('PokemonListeComponent', () => {
  let component: PokemonListeComponent;
  let fixture: ComponentFixture<PokemonListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
