import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeGuessComponent } from './poke-guess/poke-guess.component';
import { PokemonListeComponent } from './pokemon-liste/pokemon-liste.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokeGuessComponent, PokemonListeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon_mouille_front';
}
