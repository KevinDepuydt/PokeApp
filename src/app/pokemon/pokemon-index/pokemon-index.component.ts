import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../pokemon";
import {PokemonService} from "../pokemon.service";
import {PokedexService} from "../pokedex.service";

@Component({
  selector: 'app-pokemon-index',
  templateUrl: './pokemon-index.component.html',
  styleUrls: ['./pokemon-index.component.css']
})
export class PokemonIndexComponent implements OnInit {
  public pokemons: Pokemon[];
  public capturedPokemons: number;

  constructor(private service: PokemonService, private pokedex: PokedexService) {
    this.pokemons = [];
    this.capturedPokemons = 0;
  }

  getCapturedPokemons(){
    let capturedPkm = JSON.parse(localStorage.getItem("capturedPokemons"));
    this.capturedPokemons = capturedPkm.length;

    while (capturedPkm.length > 0) {
      let id = capturedPkm.pop();
      let pokedexPokemon = this.pokedex.getPokemonFromPokedex(id);

      if (pokedexPokemon) {
        // get pokemon from local storage
        let pokemon = new Pokemon(pokedexPokemon.name, "https://pokeapi.com/api/v1/pokemon/"+pokedexPokemon.id+"/");
        pokemon.setDetails(pokedexPokemon);
        this.pokemons.push(pokemon);
      } else {
        // get pokemon from service
        this.service.getPokemonById(id)
          .subscribe(res => {
            let pokemon = new Pokemon(res.name, "https://pokeapi.com/api/v1/pokemon/"+res.id+"/");
            pokemon.setDetails(res);
            this.pokemons.push(pokemon);
            this.pokedex.addPokemonToPokedex(pokemon);
          }, error => {
            console.log(error);
            if (error.status !== 404) {
              capturedPkm.push(id);
            }
          });
      }
    }
  }

  ngOnInit() {
    this.getCapturedPokemons();
  }
}
