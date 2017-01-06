import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PokemonService {
  private apiUrl = "http://pokeapi.co/api/v2/";

  constructor(private http: Http) { }

  getPokemonById(id) {
    return this.http.get(this.apiUrl+"pokemon/"+id).map(res => res.json())
  }
}
