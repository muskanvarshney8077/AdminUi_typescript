import "./Home.css";
import { useMyContext } from "../../context/MyContext";
import EditIcon from "../../assets/Edit.svg";
import DeleteIcon from "../../assets/Delete.svg";
import Tick from "../../assets/Tick.svg";
import Cancel from "../../assets/Cancel.svg";

const Home = () => {
  const {
    state,
    handleDeleteSingle,
    handleEditChange,
    handleEditSaveButton,
    handleEditClickButton,
    handleEditCancelButton,
  } = useMyContext();

  return (
    <div>
      <table className="mainTable">
        <thead>
          <tr className="trCss">
            <th className="tdCss header">
              <input type="checkbox" />
            </th>
            <th className="tdCss header">Name</th>
            <th className="tdCss header">Email</th>
            <th className="tdCss header">Role</th>
            <th className="tdCss header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.filterData.map((ele) => (
            <tr key={ele.id} className="rowCss">
              {state.editId === ele.id ? (
                <>
                  <td></td>
                  <td className="tdCss ">
                    <input
                      type="text"
                      value={state.formData.name}
                      onChange={(e) => {
                        handleEditChange(e);
                      }}
                      className="inputCss"
                    />
                  </td>
                  <td className="tdCss ">
                    <input
                      type="text"
                      value={state.formData.email}
                      onChange={(e) => {
                        handleEditChange(e);
                      }}
                      className="inputCss"
                    />
                  </td>
                  <td className="tdCss ">
                    <input
                      type="text"
                      value={state.formData.role}
                      onChange={(e) => {
                        handleEditChange(e);
                      }}
                      className="inputCss"
                    />
                  </td>

                  <td className="tdCss actionCss">
                    <img src={Tick} alt="tick" onClick={handleEditSaveButton} />
                    <img
                      src={Cancel}
                      alt="cancel"
                      width={30}
                      height={30}
                      onClick={handleEditCancelButton}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="tdCss">
                    <input type="checkbox" />
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
                    />
                    <img
                      src={DeleteIcon}
                      width="35"
                      height="35"
                      onClick={() => {
                        handleDeleteSingle(ele.id);
                      }}
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
