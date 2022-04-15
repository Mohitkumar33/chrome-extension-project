import "./todo.css";
import { NoTodos } from "./noTodos";
import { AddTodo } from "./addTodo";
import { useTodos } from "../../context/todo-context";

const Todo = () => {
  const { todosList } = useTodos();
  return <div>{todosList.length > 0 ? <AddTodo /> : <NoTodos />}</div>;
};

export { Todo };
