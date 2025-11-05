import { Routes } from '@angular/router';
import { PokeGuessComponent } from './poke-guess/poke-guess.component';
import { PokemonListeComponent } from './pokemon-liste/pokemon-liste.component';

export const routes: Routes = [
  { path: '', redirectTo: 'guess', pathMatch: 'full' },
  { path: 'guess', component: PokeGuessComponent },
  { path: 'liste', component: PokemonListeComponent },
];
