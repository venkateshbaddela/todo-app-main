import React, { useState } from "react";
import { list } from "./Data";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

interface TodoContext {
  todoItems: Todo[];
  filterTodo: Todo[];
  setTodoItems: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilterTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

interface AppContextProps {
  children: React.ReactNode;
}

const AppContext = React.createContext<TodoContext | undefined>(undefined);

export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [todoItems, setTodoItems] = useState<Todo[]>(list);

  const [filterTodo, setFilterTodo] = useState<Todo[]>(todoItems);

  return (
    <AppContext.Provider
      value={{
        todoItems,
        filterTodo,
        setFilterTodo,
        setTodoItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  let context = React.useContext(AppContext);

  if (context === undefined) {
    throw Error(
      "AppContext must be used inside of a Provider components, " +
        "otherwise it will not function correctly."
    );
  }
  return context;
};
