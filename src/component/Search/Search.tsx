import "./Search.css";
import { useMyContext } from "../../context/MyContext";
const Search = () => {
  const { handleState } = useMyContext();
  return (
    <div className="searchCss">
      <form className="example">
        <input
          type="text"
          placeholder="Search.."
          name="search"
          onChange={(e) => {
            handleState({ searchText: e.target.value });
          }}
        />
      </form>
    </div>
  );
};

export default Search;
