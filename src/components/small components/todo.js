import "./todo.css";
import { NoTodos } from "./noTodos";
import { AddTodo } from "./addTodo";
import { useTodos } from "../../context/todo-context";

const Todo = ({ setShowTodo }) => {
  const { todosList } = useTodos();
  return (
    <div>
      {todosList.length >= 0 ? (
        <AddTodo setShowTodo={setShowTodo} />
      ) : (
        <NoTodos />
      )}
    </div>
  );
};

export { Todo };
