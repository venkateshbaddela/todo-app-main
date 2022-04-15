import Card from "./ui/Card";
import Button from "./ui/Button";
import "./TodoAccess.scss";
import { useState, useEffect } from "react";
import { useGlobalContext } from "./context/Context";

enum TodoSortBtns {
  Active = "active",
  All = "all",
  Completed = "completed",
}

const TodoAccess: React.FC = () => {
  const { todoItems, setTodoItems, setFilterTodo } = useGlobalContext();

  const [btnClicked, setBtnClicked] = useState<TodoSortBtns>(TodoSortBtns.All);

  useEffect(() => {
    const sortTodo = () => {
      switch (btnClicked) {
        case "active":
          return setFilterTodo(
            todoItems.filter((todo) => todo.completed !== true)
          );
        case "completed":
          return setFilterTodo(
            todoItems.filter((todo) => todo.completed !== false)
          );

        default:
          return setFilterTodo(todoItems);
      }
    };

    sortTodo();
  }, [todoItems, btnClicked, setFilterTodo, setTodoItems]);

  const todoClearHandler = () => {
    setTodoItems(todoItems.filter((todo) => todo.completed !== true));
  };

  const activeBtn = (actBtn: string) => {
    return btnClicked === actBtn ? "access-btn activeBtn" : "access-btn";
  };

  const totalTodosLeft = todoItems.length === 1 ? "item left" : "items left";

  return (
    <Card className="access">
      <span className="access-items">{`${todoItems.length} ${totalTodosLeft}`}</span>
      <Card className="access-btnbox">
        <Button
          className={activeBtn("all")}
          onClick={() => {
            setBtnClicked(TodoSortBtns.All);
          }}
        >
          All
        </Button>
        <Button
          className={activeBtn("active")}
          onClick={() => {
            setBtnClicked(TodoSortBtns.Active);
          }}
        >
          Active
        </Button>
        <Button
          className={activeBtn("completed")}
          onClick={() => {
            setBtnClicked(TodoSortBtns.Completed);
          }}
        >
          Completed
        </Button>
      </Card>
      <Button
        className="access-btn"
        onClick={() => {
          todoClearHandler();
        }}
      >
        Clear Completed
      </Button>
    </Card>
  );
};

export default TodoAccess;
