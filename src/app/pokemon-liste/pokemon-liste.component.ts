import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-liste.component.html',
  styleUrls: ['./pokemon-liste.component.css']
})
export class PokemonListeComponent implements OnInit {
  pokemons: any[] = [];
  displayedPokemons: any[] = [];
  types: string[] = [];

  selectedType: string = '';
  sortCriteria: string[] = [];

  apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=30';
  nextUrl: string | null = null;
  loading = false;

  selectedPokemon: any = null;
  errorMessage = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons(this.apiUrl);
    this.loadTypes();
  }

  loadPokemons(url: string): void {
    if (this.loading) return;
    this.loading = true;

    this.pokemonService.getPokemonList(url).subscribe({
      next: async (response) => {
        const promises = response.results.map((p: any) =>
          this.pokemonService.getPokemonDetails(p.url).toPromise()
        );
        const details = await Promise.all(promises);
        this.pokemons.push(...details);
        this.nextUrl = response.next;
        this.loading = false;
        this.applyFiltersAndSorts();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erreur de chargement des Pokémon 😢';
      }
    });
  }

  loadTypes(): void {
    this.pokemonService.getPokemonTypes().subscribe(response => {
      this.types = response.results.map((t: any) => t.name);
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      (window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.8 &&
      !this.loading && this.nextUrl
    ) {
      this.loadPokemons(this.nextUrl);
    }
  }

  applyFiltersAndSorts(): void {
    let filtered = [...this.pokemons];

    if (this.selectedType) {
      filtered = filtered.filter(p =>
        p.types.some((t: any) => t.type.name === this.selectedType)
      );
    }

    this.sortCriteria.forEach(criterion => {
      filtered.sort((a: any, b: any) => {
        const valA = a[criterion] ?? 0;
        const valB = b[criterion] ?? 0;
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      });
    });

    this.displayedPokemons = filtered;
  }

  toggleSort(criterion: string): void {
    if (this.sortCriteria.includes(criterion)) {
      this.sortCriteria = this.sortCriteria.filter(c => c !== criterion);
    } else {
      this.sortCriteria.push(criterion);
    }
    this.applyFiltersAndSorts();
  }

  onTypeChange(): void {
    this.applyFiltersAndSorts();
  }

  openPokemonDetails(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }

  closeModal(): void {
    this.selectedPokemon = null;
  }
}
