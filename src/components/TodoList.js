import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Error from "./Error";
import {
  toggle,
  destroy,
  selectFilteredTodos,
  getTodosAsync,
} from "../redux/todos/todosSlice";

function TodoList() {
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, []);

  const handleDestroy = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(destroy(id));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <div>
      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li
            key={item.id}
            className={item.completed === true ? "completed" : ""}
          >
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={() => dispatch(toggle({ id: item.id }))}
                checked={item.completed}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDestroy(item.id)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

// selectorler ile herhangi bir state altındaki herhangi bir elemanı seçtirebiliriz sonrada o seçimi import edip doğrudan kullanabiliriz.
