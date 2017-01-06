import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../pokemon.service";
import {Pokemon} from "../pokemon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  public pokemonToLoad: number = 20;
  public pokemons: Pokemon[];
  public safariProgress: number;

  constructor(private service: PokemonService, private router: Router) {
    this.safariProgress = 0;
    this.pokemons = [];
  }

  getRandomPokemons(){
    this.safariProgress = 0;
    this.pokemons = [];

    let pokemonIds: number[] = Array.from({length: this.pokemonToLoad}, () => Math.floor(Math.random() * 721) + 1);

    while (pokemonIds.length > 0) {
      let id = pokemonIds.pop();
      this.service.getPokemonById(id)
        .subscribe(res => {
          let pokemon = new Pokemon(res.name, "https://pokeapi.com/api/v1/pokemon/"+res.id+"/");
          pokemon.setDetails(res);

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

  ngOnInit() {
    this.getRandomPokemons();
  }

}
