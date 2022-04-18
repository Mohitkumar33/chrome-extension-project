import { useEffect, useState, useRef } from "react";
import { useTodos } from "../../context/todo-context";
import { TodoAdded } from "./todoAdded";
import { v4 as uuid } from "uuid";
const AddTodo = ({ setShowTodo }) => {
  const { todosList, setTodosList } = useTodos();
  const [todoInput, setTodoInput] = useState("");
  // const searchInput = useRef();
  const focusTodoInput = useRef();
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todosList));
  }, [todosList]);
  useEffect(() => {
    if (focusTodoInput.current) focusTodoInput.current.focus();
  }, [focusTodoInput]);
  // useEffect(() => {
  //   // current property is refered to input element
  //   console.log(searchInput);
  //   searchInput.current.focus();
  // }, []);
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
            ref={focusTodoInput}
            // ref={searchInput}
            // ref={(input) => (input ? input.focus() : null)} // focus is coming on input but we are unable to edit any other input on the screen
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
