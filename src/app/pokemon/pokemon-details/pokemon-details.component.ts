import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";
import {PokedexService} from "../pokedex.service";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  public pokemon: Pokemon = new Pokemon();

  constructor(private route: ActivatedRoute, private service: PokemonService, private pokedex: PokedexService) { }

  getPokemon(id) {
    let pokedexPokemon = this.pokedex.getPokemonFromPokedex(id);
    if (pokedexPokemon) {
      // get pokemon from local storage
      this.pokemon = new Pokemon(pokedexPokemon.name, "https://pokeapi.com/api/v1/pokemon/"+pokedexPokemon.id+"/");
      this.pokemon.setDetails(pokedexPokemon);
    } else {
      // get pokemon from service
      this.service.getPokemonById(id)
        .subscribe(res => {
            this.pokemon = new Pokemon(res.name, "https://pokeapi.com/api/v1/pokemon/"+res.id+"/");
            this.pokemon.setDetails(res);
            this.pokedex.addPokemonToPokedex(this.pokemon);
          }, error => {
            console.log(error)
          }
        );
    }
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.getPokemon(id);
  }

}
