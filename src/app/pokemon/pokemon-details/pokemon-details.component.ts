import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  public pokemon: Pokemon = new Pokemon();

  constructor(private route: ActivatedRoute, private service: PokemonService) { }

  getPokemon(id) {
    this.service.getPokemonById(id)
      .subscribe(response => {
          this.pokemon = new Pokemon(response.name, "https://pokeapi.com/api/v1/pokemon/"+response.id+"/");
          this.pokemon.setDetails(response);
        }, error => {
          console.log(error)
        }
      );
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.getPokemon(id);
  }

}
