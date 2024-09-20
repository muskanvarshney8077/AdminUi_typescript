import { createContext, useContext, useEffect, useReducer } from "react";
import { initialStateType, contextType, mainDataObject } from "../Type/Type";
import { dataFromAPI } from "../API/Data";
const MyContext = createContext<contextType | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: initialStateType = {
    mainData: [],
    searchText: "",
    filterData: [],
    editId: "",
    formData: {
      id: "",
      name: "",
      email: "",
      role: "",
    },
    deleteIdArray: [],
    currentpage: 1,
    records: [],
    npage: 1,
    modalOpen: false,
    isSearch: true,
    isInsert: false,
  };
  const reducer = (
    state: initialStateType,
    newState: Partial<initialStateType>
  ): initialStateType => ({ ...state, ...newState });
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleState = (obj: Partial<initialStateType>) => {
    dispatch(obj);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  console.log(state.currentpage, state.filterData.length);
  useEffect(() => {
    dataFromAPI().then((res) =>
      handleState({ mainData: res, filterData: res })
    );
  }, []);
  const paginationFunction = (demoArr: mainDataObject[]) => {
    const itemPerPage = 10;
    const lastIndex = state?.currentpage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const records = demoArr.slice(firstIndex, lastIndex);

    handleState({
      npage: Math.ceil(demoArr.length / itemPerPage),
      filterData: records,
    });
  };
  useEffect(() => {
    paginationFunction([...state.mainData]);
  }, [state?.mainData, state?.currentpage, state?.isSearch, state?.isInsert]);
  useEffect(() => {
    if (state?.searchText) {
      searchFunction(state?.searchText);
    } else {
      handleState({ isSearch: true });
    }
  }, [state?.searchText]);
  useEffect(() => {
    handleState({
      currentpage: 1,
    });
  }, [state?.isInsert]);

  const searchFunction = (searchName: string) => {
    const arr = state?.mainData.filter(
      (ele) =>
        ele.name.toLowerCase().includes(searchName.toLowerCase()) ||
        ele.role.includes(searchName) ||
        ele.email.toLowerCase().includes(searchName.toLowerCase())
    );
    paginationFunction(arr);
    handleState({
      // filterData: arr,
      isSearch: false,
      currentpage: 1,
      npage: Math.ceil(state?.filterData.length / 10),
    });
  };

  const handleEditClickButton = (editID: string) => {
    const obj = state?.filterData.find((ele) => ele.id === editID);
    handleState({
      editId: editID,
      formData: {
        ...state?.formData,
        id: editID.toString(),
        name: obj?.name ? obj.name : "",
        email: obj?.email ? obj.email : "",
        role: obj?.role ? obj.role : "",
      },
    });
  };

  const contextValue = {
    state,
    handleState,
    handleEditClickButton,
  };
  return (
    <div>
      <div>
        <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
      </div>
    </div>
  );
};
const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useMyContext };
