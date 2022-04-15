import { createContext, useContext, useState } from "react";

const todosContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todosList, setTodosList] = useState([]);
  return (
    <todosContext.Provider value={{ todosList, setTodosList }}>
      {children}
    </todosContext.Provider>
  );
};

const useTodos = () => useContext(todosContext);

export { TodosProvider, useTodos };
