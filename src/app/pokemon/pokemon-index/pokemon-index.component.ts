import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../pokemon";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-pokemon-index',
  templateUrl: './pokemon-index.component.html',
  styleUrls: ['./pokemon-index.component.css']
})
export class PokemonIndexComponent implements OnInit {
  public pokemons: Pokemon[];
  public capturedPokemons: number;

  constructor(private service: PokemonService) {
    this.pokemons = [];
    this.capturedPokemons = 0;
  }

  getCapturedPokemons(){
    let pokedex = JSON.parse(localStorage.getItem("pokedex"));
    this.capturedPokemons = pokedex.length;

    while (pokedex.length > 0) {
      let id = pokedex.pop();
      this.service.getPokemonById(id)
        .subscribe(res => {
          let pokemon = new Pokemon(res.name, "https://pokeapi.com/api/v1/pokemon/"+res.id+"/");
          pokemon.setDetails(res);

          this.pokemons.push(pokemon);
        }, error => {
          console.log(error);
          if (error.status !== 404) {
            pokedex.push(id);
          }
        });
    }
  }

  ngOnInit() {
    this.getCapturedPokemons();
  }
}
