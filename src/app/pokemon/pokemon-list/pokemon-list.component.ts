import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../pokemon";
import {Router} from "@angular/router";
import {PokedexService} from "../pokedex.service";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  public pokemonToLoad: number = 20;
  public pokemons: Pokemon[];
  public safariProgress: number;

  constructor(private service: PokemonService, private pokedex: PokedexService, private router: Router) {
    this.safariProgress = 0;
    this.pokemons = [];
  }

  getRandomPokemons(){
    this.safariProgress = 0;
    this.pokemons = [];

    let pokemonIds: number[] = Array.from({length: this.pokemonToLoad}, () => Math.floor(Math.random() * 721) + 1);

    while (pokemonIds.length > 0) {
      let id = pokemonIds.pop();
      let pokedexPokemon = this.pokedex.getPokemonFromPokedex(id);

      if (pokedexPokemon) {
        // get pokemon from local storage
        let pokemon = new Pokemon(pokedexPokemon.name, "https://pokeapi.com/api/v1/pokemon/"+pokedexPokemon.id+"/");
        pokemon.setDetails(pokedexPokemon);

        this.pokemons.push(pokemon);
        this.safariProgress = (this.pokemons.length * 100) / this.pokemonToLoad;
      } else {
        // get pokemon from service
        this.service.getPokemonById(id)
          .subscribe(res => {
            let pokemon = new Pokemon(res.name, "https://pokeapi.com/api/v1/pokemon/"+res.id+"/");
            pokemon.setDetails(res);

            this.pokedex.addPokemonToPokedex(pokemon);

            this.pokemons.push(pokemon);
            this.safariProgress = (this.pokemons.length * 100) / this.pokemonToLoad;
          }, error => {
            console.log(error);
            if (error.status !== 404) {
              pokemonIds.push(id);
            }
          });
      }
    }
  }

  ngOnInit() {
    this.getRandomPokemons();
  }

}
