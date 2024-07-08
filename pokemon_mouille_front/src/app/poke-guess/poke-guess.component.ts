import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-poke-guess',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './poke-guess.component.html',
  styleUrls: ['./poke-guess.component.css']
})
export class PokeGuessComponent {
   
  pokemon_name: string | undefined;
  pokemon_img_url: string | undefined;
  pokemon_api_url: string = 'https://pokeapi.co/api/v2/pokemon/';
  total_pokemon: number = 1010;
  error_name: string = "Humain"
  error_image_url: string ="./assets/human.jpeg"

  constructor(private http: HttpClient) {}

  startSearch(userName: string) {
    const pokemonId = this.convertNameToId(userName);
    const url = `${this.pokemon_api_url}${pokemonId}`;

    this.http.get<any>(url).subscribe(
      data => {
        this.pokemon_name = data.name;
        this.pokemon_img_url = data.sprites.other['official-artwork'].front_default;
      },
      error => {
        console.error('Error fetching Pokémon data', error);
        this.pokemon_name = this.error_name;
        this.pokemon_img_url = this.error_image_url;
      }
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('userName') as HTMLInputElement;
    this.startSearch(input.value);
  }

  convertNameToId(name: string): number {
    const hash = this.hashString(name.toLowerCase());
    const id = (hash % this.total_pokemon) + 1;
    console.log(`Converted name '${name}' to ID: ${id}`); // Debugging line
    return id;
  }

  hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}
