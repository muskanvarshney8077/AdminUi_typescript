import "./App.css";
import { DataProvider } from "./context/MyContext";

import Home from "./component/Home/Home";
import Search from "./component/Search/Search";
import NavBar from "./component/NavBar/NavBar";
import DeleteSelected from "./component/DeleteSelected/DeleteSelected";
function App() {
  return (
    <div>
      <DataProvider>
        <div className="headerCss">
          <NavBar />
          <Search />
        </div>

        <Home />
        <DeleteSelected />
      </DataProvider>
    </div>
  );
}

export default App;
