import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from "./pokemon/pokemon-details/pokemon-details.component";
import { PokemonService } from "./pokemon/pokemon.service";
import { PokemonIndexComponent } from './pokemon/pokemon-index/pokemon-index.component';
import {PokedexService} from "./pokemon/pokedex.service";

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PokemonIndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule
  ],
  providers: [PokemonService, PokedexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
