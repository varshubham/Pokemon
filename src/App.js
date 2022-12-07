import { useState } from 'react';
import './App.css';

function App() {
  const [pokename, setPokename] = useState("");
  const [pokemon, setPokemon] = useState({ name: "", species: "", img: "", hp: "", attack: "", defence: "", type: "", speed: "" })
  const search = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);

    if (response.status === 404) {
        document.getElementById('card').innerHTML="Pokemon Not Found"
    }
    else {
      const data = await response.json();

      setPokemon({
        name: pokename,
        species: data.species.name,
        img: data.sprites.front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defence: data.stats[2].base_stat,
        type: data.types[0].type.name,
        speed: data.stats[5].base_stat
      })
    }

  }
  return (
    <div className="App">
      <div className="Titlesection">
        <h1>Pokemon Card</h1>
        <input type="text" onChange={(e) => { setPokename(e.target.value) }} />
        <button onClick={search}>Search</button>
      </div>

      {(pokemon.name !== "") ?
        <div className='card' id='card'>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.img} alt="image" />
          <div className="container1">
            <h3>Species : {pokemon.species}</h3>
            <h3>Type : {pokemon.type}</h3>
          </div>
          <div className="container1">
            <h3>Hp : {pokemon.hp}</h3>
            <h3>Attack : {pokemon.attack}</h3>
          </div>
          <div className="container1">
            <h3>Defense : {pokemon.defence}</h3>
            <h3>Speed : {pokemon.speed}</h3>
          </div>
        </div> : <h2>Please Enter Pokemon name</h2>
      }
    </div>

  );
}

export default App;
