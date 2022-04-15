import "./detailedLanding.css";
import { useState } from "react";
import { Todo } from "./small components/todo";
// import { useTodos } from "../context/todo-context";

const DetailedLanding = ({ userEntered }) => {
  const [showTodo, setShowTodo] = useState(false);
  // const { todosList } = useTodos();
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();
  const [focusMessage, setFocusMessage] = useState(
    localStorage.getItem("focusOfTheDay")
      ? localStorage.getItem("focusOfTheDay")
      : ""
  );
  const [finalMessage, setFinalMessage] = useState(
    localStorage.getItem("focusOfTheDay")
      ? localStorage.getItem("focusOfTheDay")
      : ""
  );
  const [focusDone, setFocusDone] = useState(
    localStorage.getItem("focusStatus") === "true" ? true : false
  );
  return (
    <div className="detailed-landing">
      <div className="top-row">
        <div className="event-and-search">
          <div className="event-section">
            <svg xmlns="http://www.w3.org/2000/svg" className="plus-icon">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            <p>Add Event</p>
          </div>
          <div>Google search</div>
        </div>
        <div>Weather</div>
      </div>
      <div className="time-and-focus">
        <p className="current-time">{time}</p>
        <p className="greeting">Good night, {userEntered}</p>

        {!finalMessage ? (
          <div className="focus-not-set">
            <p className="focus-ask">What's your main focus for today?</p>
            <input
              type="text"
              className="focus-input"
              value={focusMessage}
              onChange={(e) => setFocusMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter"
                  ? (setFinalMessage(focusMessage),
                    localStorage.setItem("focusOfTheDay", focusMessage))
                  : ""
              }
            />
          </div>
        ) : (
          <div className="focus-set">
            <p className="focus-given">Main focus of the day</p>
            <div className="main-focus-checkbox">
              <input
                type="checkbox"
                checked={focusDone}
                onChange={(e) => {
                  setFocusDone(e.target.checked);
                  localStorage.setItem("focusStatus", e.target.checked);
                }}
              />
              {focusDone ? (
                <div>
                  <label style={{ textDecoration: "line-through" }}>
                    {localStorage.getItem("focusOfTheDay")}
                  </label>
                </div>
              ) : (
                <label>{localStorage.getItem("focusOfTheDay")}</label>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pencil-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                onClick={() => {
                  setFinalMessage("");
                  localStorage.removeItem("focusOfTheDay");
                  localStorage.removeItem("focusStatus");
                  setFocusDone(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="trash-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                onClick={() => {
                  setFocusMessage("");
                  setFinalMessage("");
                  localStorage.removeItem("focusOfTheDay");
                  localStorage.removeItem("focusStatus");
                  setFocusDone(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        )}
        {focusDone ? (
          <p style={{ visibility: "visible" }}>Good job</p>
        ) : (
          <p style={{ visibility: "hidden" }}>Good job</p>
        )}
      </div>
      <div className="bottom-row">
        <div>Setting</div>
        <div className="quote-section">
          <p>Talk does't cook rice</p>
          <p className="quote-author">By a man</p>
        </div>
        <div className="todo-dialog">
          <div onClick={() => setShowTodo((prev) => !prev)}>Todo</div>
          <div
            className="todo-dialog-setter"
            style={{
              display: showTodo ? "block" : "none",
            }}
          >
            <Todo setShowTodo={setShowTodo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DetailedLanding };
