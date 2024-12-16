import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/pokedex/Search";
import Filters from "../components/pokedex/Filters";
import PokemonList from "../components/pokedex/PokemonList";
import PokemonCard from "../components/pokedex/PokemonCard";
import { useNameContext } from "../contexts/nameContext";
import "../styles/Pokedex.css";
function Pokedex() {
  const [pokemons, setPokemons] = useFetch();
  const [pokemonUrl, setPokemonUrl] = useState(null);
  const [name, dispatch] = useNameContext();
  const [isFiltering, setIsFiltering] = useState(false);
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    setPokemons("https://pokeapi.co/api/v2/pokemon");
  };

  const handleSearch = (value) => {
    if (!value) {
      setIsFiltering(false);
      setPokemonUrl(null);
      setPokemons("https://pokeapi.co/api/v2/pokemon");
    } else {
      setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}`);
    }
  };

  const handleTypeFilter = (type) => {
    if (!type) {
      setIsFiltering(false);
      setPokemons("https://pokeapi.co/api/v2/pokemon");
    } else {
      setIsFiltering(true);
      setPokemons(`https://pokeapi.co/api/v2/type/${type}`);
    }
    console.log(type);
  };

  const onNext = () => {
    setPokemons(pokemons?.next);
  };
  const onPrev = () => {
    setPokemons(pokemons?.previous);
  };

  const pokemonsArray = isFiltering ? pokemons?.pokemon : pokemons?.results;
  return (
    <div className="pokedex">
      <div className="footer__a">
        <img className="footer__logo" src="/pokedex_logo.png" alt="" />
      </div>
      <div className="footer__b">
        <img className="footer__favicon" src="/favicon.png" alt="" />
      </div>
      <div className="pokedex__container">
        <div className="pokedex__header">
          <Link className="back-link" to="/">{"⬅"}Volver</Link>
          <div>
            <h2 className=" pokedex__title">
              Bienvenido {name.toUpperCase()}{" "}
            </h2>
            <p>Aqui podras encontrar tu pokemon favorito.</p>
          </div>
        </div>
        <div className="pokedex__form">
          <Search handleSearch={handleSearch} />
          <Filters handleTypeFilter={handleTypeFilter} />
        </div>

        <button onClick={onPrev} disabled={!pokemons?.previous}>
          Anterior
        </button>
        <button onClick={onNext} disabled={!pokemons?.next}>
          Siguiente
        </button>

        <div className="pokedex__card">
          
          {pokemonUrl ? (
            <PokemonCard url={pokemonUrl} />
          ) : (
            <PokemonList pokemons={pokemonsArray} isFiltering={isFiltering} />
          )}
        </div>
      </div>
    </div>
  );
}

export { Pokedex };
