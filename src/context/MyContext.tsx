import { createContext, useContext, useEffect, useReducer } from "react";
import { initialStateType, contextType, formDataType } from "../Type/Type";
import { dataFromAPI } from "../API/Data";
const MyContext = createContext<contextType | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: initialStateType = {
    mainData: [],
    searchText: "",
    filterData: [],
    deleteId: -1,
    checkedArray: [],
    editId: -1,
    formData: {
      name: "",
      email: "",
      role: "",
    },
  };
  const reducer = (
    state: initialStateType,
    newState: Partial<initialStateType>
  ): initialStateType => ({ ...state, ...newState });
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleState = (obj: Partial<initialStateType>) => {
    dispatch(obj);
  };
  // UseEffect
  useEffect(() => {
    dataFromAPI().then((res) =>
      handleState({ mainData: res, filterData: res })
    );
  }, []);
  useEffect(() => {
    if (state.searchText) {
      searchFunction(state.searchText);
    } else {
      handleState({ filterData: state.mainData });
    }
  }, [state.searchText]);
  const searchFunction = (searchName: string) => {
    const arr = state.mainData.filter(
      (ele) =>
        ele.name.toLowerCase().includes(searchName.toLowerCase()) ||
        ele.role.includes(searchName) ||
        ele.email.toLowerCase().includes(searchName.toLowerCase())
    );
    handleState({ filterData: arr });
  };
  const handleDeleteSingle = (id: number) => {
    console.log(id);
    const arr = state.filterData.filter((ele) => ele.id !== id);
    handleState({ filterData: arr });
  };
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
  };
  const handleEditSaveButton = () => {};
  const handleEditClickButton = (editID: number) => {
    const arr = state.filterData.find((ele) => ele.id === editID);
    handleState({
      editId: editID,
      formData: {
        ...state.formData,
        name: arr.name,
        email: arr.email,
        role: arr.role,
      },
    });
  };
  const handleEditCancelButton = () => {};
  const contextValue = {
    state,
    handleState,
    handleDeleteSingle,
    handleEditChange,
    handleEditSaveButton,
    handleEditClickButton,
    handleEditCancelButton,
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
// export const MyContext = createContext("");
export { DataProvider, useMyContext };
