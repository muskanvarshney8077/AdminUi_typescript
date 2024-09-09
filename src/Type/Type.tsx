export type mainDataObject = {
  id: number;
  name: string;
  email: string;
  role: string;
};
export type initialStateType = {
  mainData: mainDataObject[];
  searchText: string;
  filterData: mainDataObject[];
  deleteId: number;
  checkedArray: number[];
  editId: number;
  formData: formDataType;
};
export type formDataType = {
  name: string;
  role: string;
  email: string;
};
export type contextType = {
  state: initialStateType;
  handleState: (obj: Partial<initialStateType>) => void;
  handleDeleteSingle: (id: number) => void;
  handleEditChange: () => void;
  handleEditSaveButton: () => void;
  handleEditClickButton: (editID: number) => void;
  handleEditCancelButton: () => void;
};
