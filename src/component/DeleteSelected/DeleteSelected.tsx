import { useMyContext } from "../../context/MyContext";
import "./DeleteSelected.css";
const DeleteSelected = () => {
  const { state, handleState } = useMyContext();

  const handleDeleteSelected = () => {
    handleState({
      filterData: [
        ...state.filterData.filter(
          (ele) => !state?.deleteIdArray.includes(ele.id)
        ),
      ],
      mainData: [
        ...state.mainData.filter(
          (ele) => !state?.deleteIdArray.includes(ele.id)
        ),
      ],
      deleteIdArray: [],
      searchText: "",
      currentpage:
        state.npage > state?.currentpage
          ? state.currentpage
          : state.searchText.length
          ? state.currentpage
          : state.currentpage - 1,

      npage: state.currentpage === 0 ? 0 : state.npage,
    });
  };
  return (
    <div>
      <button
        className="deleteSelectedCss"
        disabled={state?.deleteIdArray.length === 0 ? true : false}
        onClick={handleDeleteSelected}
        style={{
          borderColor: state?.deleteIdArray.length === 0 ? "grey" : "black",
          backgroundColor: state?.deleteIdArray.length === 0 ? "grey" : "red",
        }}
      >
        Delete Selected
      </button>
    </div>
  );
};

export default DeleteSelected;
