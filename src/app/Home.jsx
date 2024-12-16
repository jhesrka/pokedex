import { useRef } from "react";
import { types, useNameContext } from "../contexts/nameContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
function Home() {
  const inputRef = useRef();
  const [name, dispatch] = useNameContext();
  const navigate = useNavigate();

  const setName = () => {
    dispatch({
      type: types.SET_NAME,
      payload: inputRef.current.value.trim(),
    });
    inputRef.current.value = "";
    navigate("/pokedex");
  };
  const clearName = () => {
    dispatch({
      type: types.CLEAR_NAME,
    });
  };

  return (
    <div className="home">
      <div className="home__content">
        <img className="home__logo" src="/pokedex_logo.png" alt="" />
        <h2 className="home__title">
          ¡Hola {name ? <>de nuevo {name.toUpperCase()}</> : "Entrenador"}!
        </h2>

        <div>
          {name ? (
            <>
              <p>
                ¡Continuemos con tu viaje! Ve a tu
                <Link className="home__link" to="/pokedex">
                  Pokedex
                </Link>
              </p>

              <button className="home__btn btn" onClick={clearName}>
                Salir
              </button>
            </>
          ) : (
            <>
              <p>Para poder comenzar, dame tu nombre </p>
              <input
                className="home__input"
                ref={inputRef}
                type="text"
                placeholder="Tu nombre..."
              />
              <button className="home__btn" onClick={setName}>
                Comenzar
              </button>
            </>
          )}
        </div>
      </div>
      <div className="footer__a">
        <img className="footer__img" src="/favicon.png" alt=""/>
      </div>
      <div className="footer__b"></div>
    </div>
  );
}

export { Home };
