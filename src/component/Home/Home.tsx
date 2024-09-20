import "./Home.css";
import { useMyContext } from "../../context/MyContext";
import EditIcon from "../../assets/Edit.svg";
import DeleteIcon from "../../assets/Delete.svg";
import Tick from "../../assets/Tick.svg";
import Cancel from "../../assets/Cancel.svg";
import { useState } from "react";

const Home = () => {
  const { state, handleState, handleEditClickButton } = useMyContext();

  const handleCheckBoxAll = () => {
    if (!state?.deleteIdArray.length) {
      handleState({
        deleteIdArray: [...state.filterData.map((ele) => ele.id)],
      });
    } else {
      handleState({ deleteIdArray: [] });
    }
  };

  const handleCheckSingle = (id: string) => {
    if (state?.deleteIdArray.find((ele) => ele.toString() === id)) {
      handleState({
        deleteIdArray: [
          ...state.deleteIdArray.filter((ele) => ele.toString() != id),
        ],
      });
    } else {
      handleState({ deleteIdArray: [...state.deleteIdArray, id] });
    }
  };

  return (
    <div className="tableContainer">
      <table className="mainTable">
        <thead className="headerTableCss">
          <tr className="trCss">
            <th className="tdCss header">
              <input
                type="checkbox"
                checked={
                  state?.filterData.length != 0 &&
                  state?.deleteIdArray.length === state?.filterData.length
                }
                onChange={handleCheckBoxAll}
              />
            </th>
            <th className="tdCss header">Name</th>
            <th className="tdCss header">Email</th>
            <th className="tdCss header">Role</th>
            <th className="tdCss header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state?.filterData.map((ele, i) => (
            <tr key={i} className="rowCss">
              {state?.editId === ele.id ? (
                <>
                  <td></td>
                  <td className="tdCss ">
                    <input
                      type="text"
                      value={state?.formData.name}
                      onChange={(e) =>
                        handleState({
                          formData: {
                            ...state?.formData,
                            name: e.target.value,
                          },
                        })
                      }
                      className="inputCss"
                    />
                  </td>
                  <td className="tdCss ">
                    <input
                      type="email"
                      value={state?.formData.email}
                      onChange={(e) =>
                        handleState({
                          ...state,
                          formData: {
                            ...state?.formData,
                            email: e.target.value,
                          },
                        })
                      }
                      className="inputCss"
                    />
                  </td>
                  <td className="tdCss ">
                    <select
                      className="selectCss"
                      value={state?.formData.role}
                      onChange={(e) =>
                        handleState({
                          ...state,
                          formData: {
                            ...state?.formData,
                            role: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="admin">admin</option>
                      <option value="member">member</option>
                    </select>
                  </td>

                  <td className="tdCss actionCss">
                    <img
                      src={Tick}
                      width="30"
                      height="30"
                      alt="tick"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleState({
                          editId: "",
                          filterData: [
                            ...state.filterData.map((ele) =>
                              ele.id === state.formData.id
                                ? {
                                    id: state?.formData.id,
                                    name: state?.formData.name,
                                    email: state?.formData.email,
                                    role: state?.formData.role,
                                  }
                                : ele
                            ),
                          ],
                          mainData: [
                            ...state.mainData.map((ele) =>
                              ele.id.toString() === state.formData.id
                                ? {
                                    id: state?.formData.id,
                                    name: state?.formData.name,
                                    email: state?.formData.email,
                                    role: state?.formData.role,
                                  }
                                : ele
                            ),
                          ],
                        });
                      }}
                    />
                    <img
                      src={Cancel}
                      alt="cancel"
                      style={{ cursor: "pointer" }}
                      width={30}
                      height={30}
                      onClick={() => {
                        handleState({
                          formData: { id: "", name: "", email: "", role: "" },
                          editId: "",
                        });
                      }}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="tdCssCheckbox">
                    <input
                      type="checkbox"
                      checked={state?.deleteIdArray.includes(ele.id)}
                      onChange={() => {
                        handleCheckSingle(ele.id);
                      }}
                    />
                  </td>
                  <td className="tdCss">{ele.name}</td>
                  <td className="tdCss">{ele.email}</td>
                  <td className="tdCss">{ele.role}</td>
                  <td className="tdCss actionCss">
                    <img
                      src={EditIcon}
                      width="30"
                      height="30"
                      onClick={() => {
                        handleEditClickButton(ele.id);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={DeleteIcon}
                      width="35"
                      height="35"
                      onClick={() => {
                        handleState({
                          filterData: state?.filterData.filter(
                            (element) => element.id !== ele.id
                          ),
                          mainData: state?.mainData.filter(
                            (element) => element.id !== ele.id
                          ),
                          currentpage:
                            state.filterData.length === 1
                              ? state.currentpage - 1
                              : state.currentpage,
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
