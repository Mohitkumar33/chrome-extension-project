import { createContext, useContext, useState } from "react";

const todosContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [events, setEvents] = useState(
    localStorage.getItem("allTheEvents")
      ? JSON.parse(localStorage.getItem("allTheEvents"))
      : []
  );
  const [todosList, setTodosList] = useState(
    localStorage.getItem("todoTasks")
      ? JSON.parse(localStorage.getItem("todoTasks"))
      : []
  );
  return (
    <todosContext.Provider
      value={{ todosList, setTodosList, events, setEvents }}
    >
      {children}
    </todosContext.Provider>
  );
};

const useTodos = () => useContext(todosContext);

export { TodosProvider, useTodos };
