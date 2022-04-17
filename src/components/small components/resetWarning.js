import "./resetWarning.css";
import { useTodos } from "../../context/todo-context";
const ResetWarning = ({ setResetWarning, setShowSetting, setUserEntered }) => {
  const { setTodosList } = useTodos();
  return (
    <div
      className="reset-background"
      onClick={() => {
        setResetWarning(false);
        setShowSetting(false);
      }}
    >
      <div className="reset-warning">
        <p>Are you Sure You want to Reset All?</p>
        <p>
          All the Todos, Events, MainFocus and Your name will be removed
          permanently.
        </p>
        <button
          className="yes-warning"
          onClick={(e) => {
            e.stopPropagation();
            localStorage.clear();
            setTodosList([]);
            setResetWarning(false);
            setShowSetting(false);
            setUserEntered(false);
          }}
        >
          Yes
        </button>
        <button
          className="no-warning"
          onClick={(e) => {
            // Working without e and e.stopPropagation() but I thoought to add it
            e.stopPropagation();
            setResetWarning(false);
            setShowSetting(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};
export { ResetWarning };
