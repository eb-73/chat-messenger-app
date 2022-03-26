import style from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search(props) {
  const onChangeSearch = (e) => {
    const search = e.target.value;
    props.searchFor(search);
  };
  return (
    <div className={style.searchBox}>
      <div className={style.inputGroup}>
        <FontAwesomeIcon className={style.searchIcon} icon={faSearch} />
        <input type="text" onChange={onChangeSearch} placeholder="Search..." />
      </div>
    </div>
  );
}

export default Search;
