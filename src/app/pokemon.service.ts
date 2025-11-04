import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getPokemonList(url: string): Observable<any> {
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }
    return this.http.get<any>(url).pipe(tap(data => this.cache.set(url, data)));
  }

  getPokemonDetails(url: string): Observable<any> {
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }
    return this.http.get<any>(url).pipe(tap(data => this.cache.set(url, data)));
  }

  getPokemonTypes(): Observable<any> {
    const url = 'https://pokeapi.co/api/v2/type';
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }
    return this.http.get<any>(url).pipe(tap(data => this.cache.set(url, data)));
  }

  clearCache(): void {
    this.cache.clear();
  }
}
