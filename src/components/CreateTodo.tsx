import { nanoid } from "nanoid";
import { useState } from "react";
import "./CreateTodo.scss";
import TodoList from "./TodoList";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { Todo } from "./context/Context";
import { useGlobalContext } from "./context/Context";
import { useThemeContext } from "./context/ThemeContext";
import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const CreateTodo: React.FC = () => {
  const [text, setText] = useState("");

  const { setTodoItems, setFilterTodo, todoItems, filterTodo } =
    useGlobalContext();

  const { theme, toggleBtn, themeHandler } = useThemeContext();

  const setThemeImg = theme === "light" ? sun : moon;

  const todoContentHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const addTodoHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setText("");
    setTodoItems((prev) => [
      ...prev,
      { id: nanoid(), content: text, completed: false },
    ]);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add: Todo,
      active = filterTodo;

    if (source.droppableId !== "TododsListContainer") return;

    add = active[source.index];
    active.splice(source.index, 1);

    if (destination.droppableId !== "TododsListContainer") return;

    active.splice(destination.index, 0, add);

    setFilterTodo(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="todo">
        <header>
          <Card className="todo-con">
            <h1 className="todo-con__head">TODO</h1>
            <Button
              onClick={themeHandler}
              className={`${
                toggleBtn ? "todo-con__btn animate" : "todo-con__btn"
              }`}
            >
              <img src={setThemeImg} alt="moon logo" />
            </Button>
          </Card>

          <form className="todo-form" onSubmit={(e) => addTodoHandler(e)}>
            <input
              type="text"
              className="todo-input"
              value={text}
              placeholder="Create a new todo..."
              onChange={todoContentHandler}
            />
          </form>
        </header>

        {todoItems.length <= 0 ? (
          <p className="todo-txt">No todoitems to show</p>
        ) : (
          <TodoList />
        )}

        <footer>
          <p className="footer-txt">Drag and drop to reorder list</p>
          <Card className="attribution">
            Challenge by
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
              rel="noreferrer"
            >
              Frontend Mentor
            </a>
            . Coded by <a href="/#">venkateshb</a>.
          </Card>
        </footer>
      </Card>
    </DragDropContext>
  );
};

export default CreateTodo;
