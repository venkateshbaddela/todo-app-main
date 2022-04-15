import "./TodoList.scss";
import TodoAccess from "./TodoAccess";
import { useGlobalContext } from "./context/Context";
import TodoListItem from "./TodoListItem";
import { Droppable } from "react-beautiful-dnd";

const TodoList: React.FC = () => {
  const { filterTodo } = useGlobalContext();

  return (
    <main className="todobox">
      <Droppable droppableId="TododsListContainer">
        {(provided, snapshot) => (
          <ul
            className="todobox-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filterTodo.map((item, index) => (
              <TodoListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <TodoAccess />
    </main>
  );
};

export default TodoList;
