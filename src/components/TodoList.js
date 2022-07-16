import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  destroy,
  selectTodos,
  selectFilteredTodos,
} from "../redux/todos/todosSlice";

function TodoList() {
  const filteredTodos = useSelector(selectFilteredTodos);

  const dispatch = useDispatch();

  const handleDestroy = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(destroy(id));
    }
  };

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
