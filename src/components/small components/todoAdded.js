import { useTodos } from "../../context/todo-context";
import { v4 as uuid } from "uuid";
import { useState } from "react";

const TodoAdded = () => {
  const { todosList, setTodosList } = useTodos();
  const [todoInput, setTodoInput] = useState("");
  const deleteTask = (itemId) => {
    setTodosList(todosList.filter((item) => item.id !== itemId));
  };
  const handleTaskStatus = (itemId) => {
    setTodosList(
      todosList.map((item) =>
        item.id === itemId ? { ...item, isDone: !item.isDone } : item
      )
    );
  };
  return (
    <div className="todo-added">
      <div className="today-arrow">
        <p>Today</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="down-arrow"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {todosList.map((item) => {
        return (
          <div className="single-todo">
            <label>
              <input
                type="checkbox"
                className="single-todo-checkbox"
                defaultChecked={item.isDone}
                onChange={() => handleTaskStatus(item.id)}
              />
              <span
                style={{
                  textDecoration: item.isDone ? "line-through" : "none",
                }}
              >
                {" "}
                {item.todoNote}
              </span>
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="cross-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => deleteTask(item.id)}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      })}

      <input
        type="text"
        placeholder="New Todo"
        className="write-todo"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyPress={(e) =>
          e.key === "Enter"
            ? (setTodosList([
                ...todosList,
                { id: uuid(), todoNote: todoInput, isDone: false },
              ]),
              setTodoInput(""))
            : undefined
        }
      />
    </div>
  );
};

export { TodoAdded };
