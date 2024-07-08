import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeGuessComponent } from './poke-guess/poke-guess.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokeGuessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokemon_mouille_front';
}
