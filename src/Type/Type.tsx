export type mainDataObject = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type initialStateType = {
  mainData: mainDataObject[];
  searchText: string;
  filterData: mainDataObject[];
  editId: string;
  formData: formDataType;
  deleteIdArray: string[];
  currentpage: number;
  records: mainDataObject[];
  npage: number;
  modalOpen: boolean;
  isSearch: boolean;
  isInsert: boolean;
};
export type formDataType = {
  id: string;
  name: string;
  role: string;
  email: string;
};
export type contextType = {
  state: initialStateType;
  handleState: (obj: Partial<initialStateType>) => void;
  handleEditClickButton: (editID: string) => void;
};
