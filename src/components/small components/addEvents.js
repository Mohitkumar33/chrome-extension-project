import { useTodos } from "../../context/todo-context";
import { v4 as uuid } from "uuid";
import "./addEvents.css";
import { useEffect, useState } from "react";
const AddEvents = ({ setShowCreateEvent }) => {
  const { events, setEvents } = useTodos();
  const [descInput, setDescInput] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");

  // useEffect(() => {}, [events]);

  useEffect(() => {
  localStorage.setItem("allTheEvents", JSON.stringify(events));
  }, [events]);
  return (
    <div className="enter-event-box" onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        placeholder="Description"
        value={descInput}
        onChange={(e) => setDescInput(e.target.value)}
      />
      <p>Set date and time of the event</p>
      <input
        type="datetime-local"
        value={dateTimeInput}
        onChange={(e) => setDateTimeInput(e.target.value)}
      />
      <button
        disabled={
          descInput.length > 0 && dateTimeInput.length > 0 ? false : true
        }
        onClick={() => {
          setEvents([
            ...events,
            { id: uuid(), description: descInput, date: dateTimeInput },
          ]);

          localStorage.setItem("allTheEvents", JSON.stringify(events));
          setDescInput("");
          setDateTimeInput("");
        }}
      >
        Create
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="close-create-event"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        onClick={() => setShowCreateEvent(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

export { AddEvents };
