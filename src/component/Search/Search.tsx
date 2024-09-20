import "./Search.css";
import { useMyContext } from "../../context/MyContext";
const Search = () => {
  const { state, handleState } = useMyContext();
  return (
    <div className="searchCss">
      <input
        className="example"
        type="text"
        placeholder="Search by Name,Email,Role"
        name="search"
        value={state.searchText}
        onChange={(e) => {
          handleState({ searchText: e.target.value });
        }}
      />
    </div>
  );
};

export default Search;
