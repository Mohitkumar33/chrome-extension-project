import { useEffect, useState } from "react";
import { useTodos } from "../../context/todo-context";
import { TodoAdded } from "./todoAdded";
import { v4 as uuid } from "uuid";
const AddTodo = ({ setShowTodo }) => {
  const { todosList, setTodosList } = useTodos();
  const [todoInput, setTodoInput] = useState("");
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todosList));
  }, [todosList]);
  return (
    <>
      {todosList.length === 0 ? (
        <div className="add-todo">
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
          <p className="no-todo-msg">No todos added yet</p>
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
      ) : (
        <TodoAdded setShowTodo={setShowTodo} />
      )}
    </>
  );
};
export { AddTodo };
