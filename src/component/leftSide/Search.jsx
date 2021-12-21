import style from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search(props) {
  // const [searchValue, setSearchValue] = useState("");
  const onChangeSearch = (e) => {
    console.log("search word:", e.target.value);
    props.searchFor(e.target.value);
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
