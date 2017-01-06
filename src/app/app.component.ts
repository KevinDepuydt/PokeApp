import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'PokeApp';

  constructor() {
    if (!localStorage.getItem("pokedex")) {
      localStorage.setItem("pokedex", JSON.stringify([]))
    }
    if (!localStorage.getItem("capturedPokemons")) {
      localStorage.setItem("capturedPokemons", JSON.stringify([]))
    }
  }
}
