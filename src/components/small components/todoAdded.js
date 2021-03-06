import { useTodos } from "../../context/todo-context";
import { v4 as uuid } from "uuid";
import { useState, useEffect, useRef } from "react";

const TodoAdded = ({ setShowTodo }) => {
  const { todosList, setTodosList } = useTodos();
  const [todoInput, setTodoInput] = useState("");
  const focusTodoInput = useRef();
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
  useEffect(() => {
  localStorage.setItem("todoTasks", JSON.stringify(todosList));
  }, [todosList]);
  useEffect(() => {
    if (focusTodoInput.current) focusTodoInput.current.focus();
  }, [focusTodoInput]);
  return (
    <div className="todo-added">
      <div className="today-arrow">
        <p>Today</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="down-arrow"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => setShowTodo((prev) => !prev)}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="all-todo-notes">
        {todosList.map((item) => {
          return (
            <div className="single-todo" key={item.id}>
              <label>
                <input
                  type="checkbox"
                  className="single-todo-checkbox"
                  defaultChecked={item.isDone}
                  onChange={() => handleTaskStatus(item.id)}
                />
                <span
                  className="todo-note"
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
                className="cross-icon"
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
      </div>

      <input
        type="text"
        placeholder="New Todo"
        className="write-todo"
        value={todoInput}
        ref={focusTodoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && todoInput.length > 0
            ? (setTodosList([
                ...todosList,
                { id: uuid(), todoNote: todoInput, isDone: false },
              ]),
              setTodoInput(""),
              localStorage.setItem("todoTasks", JSON.stringify(todosList)))
            : undefined
        }
      />
    </div>
  );
};

export { TodoAdded };
