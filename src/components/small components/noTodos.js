import { useState, useEffect } from "react";
import { useTodos } from "../../context/todo-context";
import { AddTodo } from "./addTodo";

const NoTodos = ({ setShowTodo }) => {
  const { todosList } = useTodos();
  const [component2, setComponent2] = useState(false);
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todosList));
  }, [todosList]);
  return (
    <>
      {!component2 ? (
        <div className="no-todos">
          <p>No todos yet</p>
          <button onClick={() => setComponent2(true)}>Add Todo</button>
        </div>
      ) : (
        <AddTodo setShowTodo={setShowTodo} />
      )}
    </>
  );
};
export { NoTodos };
