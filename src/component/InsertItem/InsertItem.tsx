import { useMyContext } from "../../context/MyContext";
import "./InsertItem.css";
const InsertItem = () => {
  const { state, handleState } = useMyContext();

  const handleModalOpenInsert = () => {
    handleState({
      mainData: [
        ...state.mainData,
        {
          id: (state.mainData.length + 1).toString(),
          name: state.formData.name,
          email: state.formData.email,
          role: state.formData.role,
        },
      ],

      modalOpen: false,
      formData: {
        id: "",
        name: "",
        email: "",
        role: "",
      },
      isInsert: state.mainData.length === 0 ? true : false,
      currentpage: state.npage,
    });
  };

  return (
    <div>
      <button
        className="insertCss"
        onClick={() => {
          handleState({ modalOpen: true });
        }}
      >
        Insert New Entry
      </button>
      {state?.modalOpen ? (
        <>
          <div className="modalContainer">
            <div className="modalOpenCss">
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  className="modalOpenInput"
                  value={state?.formData.name}
                  onChange={(e) =>
                    handleState({
                      ...state,
                      formData: { ...state?.formData, name: e.target.value },
                    })
                  }
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  className="modalOpenInput"
                  value={state?.formData.email}
                  onChange={(e) =>
                    handleState({
                      ...state,
                      formData: { ...state?.formData, email: e.target.value },
                    })
                  }
                />
              </label>
              <label htmlFor="role">
                Role:
                <select
                  className="modalOpenInput selectInputCss"
                  value={state?.formData.role}
                  onChange={(e) =>
                    handleState({
                      ...state,
                      formData: { ...state?.formData, role: e.target.value },
                    })
                  }
                >
                  <option value="" disabled>
                    Select any
                  </option>
                  <option value="admin">admin</option>
                  <option value="member">member</option>
                </select>
              </label>
              <div className="modalOpenButtonStyle">
                <button
                  className="modalOpenButton"
                  onClick={handleModalOpenInsert}
                >
                  Insert
                </button>
                <button
                  className="modalOpenButton"
                  onClick={() => {
                    handleState({
                      modalOpen: false,
                      formData: { id: "", name: "", email: "", role: "" },
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InsertItem;
