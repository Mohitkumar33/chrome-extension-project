import { useState } from "react";
import { AddTodo } from "./addTodo";

const NoTodos = () => {
  const [component2, setComponent2] = useState(false);
  return (
    <>
      {!component2 ? (
        <div className="no-todos">
          <p>No todos yet</p>
          <button onClick={() => setComponent2(true)}>Add Todo</button>
        </div>
      ) : (
        <AddTodo />
      )}
    </>
  );
};
export { NoTodos };
