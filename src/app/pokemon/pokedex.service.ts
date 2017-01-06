import { Injectable } from '@angular/core';

@Injectable()
export class PokedexService {
  private pokedex = JSON.parse(localStorage.getItem("pokedex"));

  constructor() { }

  getPokemonFromPokedex(id) {
    return this.pokedex[id];
  }

  addPokemonToPokedex(pokemon) {
    this.pokedex[pokemon.id] = pokemon;
  }
}
