export class Pokemon {
  public id: Number;
  public image: String;
  public abilities: Array<any>;
  public stats: Array<any>;
  public name: String;
  public weight: Number;
  public height: Number;
  public is_default: Boolean;
  public base_experience: Number;
  public types: Array<any>;


  constructor(name: String = "", url: String = ""){
    let splittedUrl = url.split('/');
    this.id = Number(splittedUrl[6]) || 0;
    this.name = name;
    this.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+this.id+".png";
  }

  setDetails(pokemon){
    this.abilities = pokemon.abilities;
    this.stats = pokemon.stats;
    this.weight = pokemon.weight;
    this.height = pokemon.height;
    this.is_default = pokemon.is_default;
    this.base_experience = pokemon.base_experience;
    this.types = pokemon.types;
  }

  capture() {
    let id = this.id.toString();
    let capturedPokemons = JSON.parse(localStorage.getItem("capturedPokemons"));

    if (capturedPokemons.indexOf(id) === -1) {
      capturedPokemons.push(id);
    }

    localStorage.setItem("capturedPokemons", JSON.stringify(capturedPokemons));
  }

  release() {
    let id = this.id.toString();
    let capturedPokemons = JSON.parse(localStorage.getItem("capturedPokemons"));

    if (capturedPokemons.indexOf(id) !== -1) {
      capturedPokemons.splice(capturedPokemons.indexOf(id), 1);
    }

    localStorage.setItem("capturedPokemons", JSON.stringify(capturedPokemons));
  }

  isCaptured() {
    let id = this.id.toString();
    let capturedPokemons = JSON.parse(localStorage.getItem("capturedPokemons"));

    return capturedPokemons.indexOf(id) !== -1;
  }
}
