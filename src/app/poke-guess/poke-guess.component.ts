import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-poke-guess',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poke-guess.component.html',
  styleUrls: ['./poke-guess.component.css']
})
export class PokeGuessComponent {

  pokemon_name?: string;
  pokemon_img_url?: string;
  pokemon_api_url = 'https://pokeapi.co/api/v2/pokemon/';
  total_pokemon = 1010;

  error_name = 'Humain';
  error_image_url = './assets/human.jpeg';

  constructor(private http: HttpClient) {}

  startSearch(userName: string) {
    const pokemonId = this.convertNameToId(userName);
    const url = `${this.pokemon_api_url}${pokemonId}`;

    this.http.get<any>(url).subscribe({
      next: data => {
        this.pokemon_name = data.name;
        this.pokemon_img_url =
          data.sprites.other['official-artwork'].front_default;
      },
      error: () => {
        this.pokemon_name = this.error_name;
        this.pokemon_img_url = this.error_image_url;
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('userName') as HTMLInputElement;
    this.startSearch(input.value);
  }

  onKeyUp(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.startSearch(input.value);
  }

  convertNameToId(name: string): number {
    const hash = this.hashString(name.toLowerCase());
    return (hash % this.total_pokemon) + 1;
  }

  hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }
}
