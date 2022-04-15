import React from "react";
import "./TodoListItem.scss";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { useGlobalContext } from "./context/Context";
import { Todo } from "./context/Context";
import cross from "../assets/images/icon-cross.svg";
import { Draggable } from "react-beautiful-dnd";

interface TodoListItemProps {
  item: Todo;
  index: number;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ item, index }) => {
  const { todoItems, setTodoItems } = useGlobalContext();

  /* function to marks todos as completed */
  const clearTodo = (item: Todo) => {
    setTodoItems((prev) =>
      prev.map((todo) => {
        const bool = todo.completed ? false : true;
        if (todo.id === item.id) {
          return { ...todo, completed: bool };
        }
        return todo;
      })
    );
  };

  /* function to delete a single todo at a time */
  const deleteTodoHandler = (item: Todo) => {
    setTodoItems(todoItems.filter((todo) => todo.id !== item.id));
  };

  return (
    <Draggable draggableId={item.id} key={item.id} index={index}>
      {(provided, snapshot) => (
        <li
          className={`todobox-item ${snapshot.isDragging && "dragactive"} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className="todobox-check">
            <input
              type="checkbox"
              id={`checkbox--${item.id}`}
              className="todobox-item__input"
              onClick={() => clearTodo(item)}
              defaultChecked={item.completed}
            />

            <label
              className="todobox-item__checkbox"
              htmlFor={`checkbox--${item.id}`}
            ></label>
            <p className="todobox-item__txt">{item.content}</p>
          </Card>
          <Button
            className="todobox-item__btn"
            onClick={() => deleteTodoHandler(item)}
          >
            <img src={cross} alt="close icon" />
          </Button>
        </li>
      )}
    </Draggable>
  );
};

export default TodoListItem;
