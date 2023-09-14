import { useState, useEffect, useMemo } from "react";
import { pokemonData } from "./data/pokemon";

const PokemonList = () => {
  /* 
    instruction: set up the following states
    - pokemons: array of pokemons. use pokemonData as initial value
    - searchTerm: search term for pokemon's name
    - sort: sort by title or rating
  */
  const [pokemons, setPokemons] = useState(pokemonData);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const types = useMemo(() => {
    let options = [];
    // instruction: get all types from pokemoneData
    pokemonData.forEach((pokemon) => {
      if (!options.includes(pokemon.type)) {
        options.push(pokemon.type);
      }
    });
    return options;
  }, [pokemonData]);

  useEffect(() => {
    let newPokemons = [...pokemonData];

    // instruction: do title search using the searchTerm state
    if (searchTerm) {
      newPokemons = newPokemons.filter(
        (i) => i.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
      );
    }

    // instruction: do type filter using the selectedType state
    if (selectedType) {
      newPokemons = newPokemons.filter((p) => p.type === selectedType);
    }
    // instruction: sort by name or level
    if (sort === "name") {
      newPokemons = newPokemons.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === "level") {
      newPokemons = newPokemons.sort((a, b) => {
        return a.level - b.level;
      });
    }

    // instruction: set pokemons state with newPokemons variable
    setPokemons(newPokemons);
  }, [pokemonData, selectedType, sort, searchTerm]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search"
            // instruction: assign searchTerm state to value
            value={searchTerm}
            onChange={(e) => {
              // instruction: set searchTerm state
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="col-6 text-end mb-3">
          <select
            className="me-1 mb-1"
            // instruction: assign sort state to value
            value={sort}
            onChange={(e) => {
              // instruction: set sort state
              setSort(e.target.value);
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="level">Sort by Level</option>
          </select>

          <select
            className="me-1 mb-1"
            // instruction: assign selectedType state to value
            value={selectedType}
            onChange={(e) => {
              // instruction: set selectedType state
              setSelectedType(e.target.value);
            }}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* 
        instruction: 
        - display the pokemons here
        - responsive layout: 1 column for mobile, 2 columns for tablet, 3 columns for desktop
      */}
      <div className="row">
        {pokemons.map((pokemon) => (
          <div className="col-lg-4 col-md-6 col-sm-12 my-5">
            <div className="card p-2">
              <h3 className="card-title"> {pokemon.name}</h3>
              <p className="card-text"> {pokemon.type}</p>
              <p className="card-text">{pokemon.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
