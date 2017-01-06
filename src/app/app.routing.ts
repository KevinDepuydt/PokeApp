import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonListComponent } from "./pokemon/pokemon-list/pokemon-list.component";
import { PokemonDetailsComponent } from "./pokemon/pokemon-details/pokemon-details.component";
import { PokemonIndexComponent } from "./pokemon/pokemon-index/pokemon-index.component";

const appRoutes: Routes = [
  {
    path: '',
    component: PokemonIndexComponent
  },
  {
    path: 'pokemon',
    component: PokemonListComponent
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
