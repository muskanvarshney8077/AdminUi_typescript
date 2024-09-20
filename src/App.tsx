import "./App.css";
import { DataProvider } from "./context/MyContext";

import Home from "./component/Home/Home";
import Search from "./component/Search/Search";
import NavBar from "./component/NavBar/NavBar";
import DeleteSelected from "./component/DeleteSelected/DeleteSelected";
import InsertItem from "./component/InsertItem/InsertItem";
import Pagination from "./component/Pagination/Pagination";
function App() {
  return (
    <div>
      <DataProvider>
        <div className="headerCss">
          <NavBar />

          <Search />
        </div>

        <Home />
        <div className="footerCss">
          <DeleteSelected />
          <Pagination />
          <InsertItem />
        </div>
      </DataProvider>
    </div>
  );
}

export default App;
