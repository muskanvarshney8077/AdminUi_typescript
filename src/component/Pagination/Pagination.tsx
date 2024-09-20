import { useMyContext } from "../../context/MyContext";
import "./Pagination.css";

const Pagination = () => {
  const { handleState, state } = useMyContext();

  const firstpage = () => {
    handleState({ currentpage: 1, deleteIdArray: [] });
  };
  const prevPage = () => {
    if (state?.currentpage !== 1) {
      handleState({
        currentpage: state?.currentpage && state?.currentpage - 1,
        deleteIdArray: [],
      });
    }
  };
  const nextPage = () => {
    if (state?.currentpage != state?.npage) {
      handleState({
        currentpage: state?.currentpage && state?.currentpage + 1,
        deleteIdArray: [],
      });
    }
  };
  const lastPage = () => {
    handleState({ currentpage: state?.npage, deleteIdArray: [] });
  };

  return (
    <div className="paginationHeader">
      <button
        disabled={state?.currentpage === 1 || state?.currentpage === 0}
        className="paginationButtonText"
        onClick={firstpage}
        style={{
          backgroundColor:
            state?.currentpage === 0 || state.currentpage === 1
              ? "grey"
              : "aquamarine",
        }}
      >
        &lt;&lt;
      </button>
      <button
        className="paginationButton"
        disabled={state?.currentpage === 1 || state?.currentpage === 0}
        onClick={prevPage}
        style={{
          backgroundColor:
            state?.currentpage === 0 || state.currentpage === 1
              ? "grey"
              : "aquamarine",
        }}
      >
        &lt;
      </button>
      <div className="headingBetween">
        {state?.currentpage} of page {state?.npage}
      </div>
      <button
        className="paginationButton"
        disabled={state?.currentpage === state.npage || state?.npage === 0}
        onClick={nextPage}
        style={{
          backgroundColor:
            state?.currentpage === state.npage || state?.npage === 0
              ? "grey"
              : "aquamarine",
        }}
      >
        &gt;
      </button>
      <button
        className="paginationButtonText"
        disabled={state?.currentpage === state.npage || state?.npage === 0}
        onClick={lastPage}
        style={{
          backgroundColor:
            state?.currentpage === state.npage || state?.npage === 0
              ? "grey"
              : "aquamarine",
        }}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
