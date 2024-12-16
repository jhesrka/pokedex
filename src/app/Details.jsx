import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { tipos } from "../utils/helpers";
import "../styles/Details.css";
function Details() {
  const params = useParams();
  const [pokemon, setPokemon] = useFetch();

  useEffect(() => {
    if (params.name) getPokemon();
  }, [params.name]);

  const getPokemon = () => {
    setPokemon(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  };
  const types = pokemon?.types.map((type) => type.type.name);
  console.log(pokemon?.name);
  console.log(pokemon?.weigth);

  return (
    <div class="details">
      <div className="footer__a">
        <img className="footer__logo" src="/pokedex_logo.png" alt="" />
      </div>
      <div className="footer__b">
        <img className="footer__favicon" src="/favicon.png" alt="" />
      </div>
      <Link to="/pokedex" className="back-link">
        {"⬅"}Volver
      </Link>
      <div className={`details__card type--${types?.[0]}`}>
        <div className="poke__card-header">
          <img
            src={pokemon?.sprites?.other?.dream_world?.front_default}
            alt={pokemon?.name}
            className="pokemon-img"
          />
        </div>

        <div className="poke__card-body">
          <span className="pokemon-id">
            #{pokemon?.id.toString().padStart(4, "0")}
          </span>
          <h2 className="poke__card-name">{pokemon?.name}</h2>

          <div className="details-info">
            <span className="pokemon-weight">
              <span className="label">Peso</span>
              {pokemon?.weigth}
            </span>
            <span className="pokemon-height">
              <span className="label">Altura</span>
              {pokemon?.heigth}
            </span>

            <div className="details-attributes">
              <div className="pokemon-types">
                <h3 className="section-title">Tipo</h3>
                <div className="poke__card-typs">
                  {types?.map((type) => (
                    <span key={type} className="poke__card-types">
                      {tipos[type]}
                    </span>
                  ))}
                </div>
              </div>

              <div className="details__card-stats">
                <h3 className="poke__card-stats-item">Habilidades</h3>
                <div className="abilities-list">
                  {pokemon?.abilities?.map((data) => (
                    <span key={data.ability.name} className="ability">
                      {data.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Details };
