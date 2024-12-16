import { useRef } from "react";
import { ImSearch } from "react-icons/im";
function Search({ handleSearch }) {
  const inputRef = useRef();
  const onSearch = () => {
    handleSearch(inputRef.current.value.toLowerCase().trim());
    inputRef.current.value=''
  };

  return (
    <div className="search">
      <div className="search__input">
        <ImSearch />
        <input ref={inputRef} type="text" placeholder="Buscar un pokemon" />
      </div>
      <button className="search__btn" onClick={onSearch}>Buscar</button>
    </div>
  );
}

export default Search;
