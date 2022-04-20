import { useTodos } from "../../context/todo-context";
import { v4 as uuid } from "uuid";
import "./addEvents.css";
import { useState } from "react";
const AddEvents = () => {
  const { events, setEvents } = useTodos();
  const [descInput, setDescInput] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  console.log(events);
  return (
    <div className="enter-event-box">
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
        onClick={() =>
          setEvents([
            ...events,
            { id: uuid(), description: descInput, date: dateTimeInput },
          ])
        }
      >
        Create
      </button>
    </div>
  );
};

export { AddEvents };
