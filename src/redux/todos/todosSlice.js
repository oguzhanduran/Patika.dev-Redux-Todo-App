import { createSlice } from "@reduxjs/toolkit";
import {
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
  getTodosAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),

    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },

  reducers: {
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //     // reducer tanımının içersinde prapere isminde bir tanım var bunu kullabiliyoruz. Prapere ile reducer state'ini değiştirmeden önce siz ona gelecek olan payload'u yapılandırabiliyoruz.

    //     // Biz formda addTodo action'ını dispatch ettiğimiz zaman title payload olarak gönderiliyor ve prepare'e düşüyor. Sonra payload return ediliyor. Sonra return edilen payload'da yukardaki action'ın içine düşüyor. Sonra da biz action altındaki payload'u kullanarak state elemanıma ekliyorum.

    //     // Prepare'in yaptığı şey reducers state'i değiştirmeden önce siz ona gelecek olan payload'u yapılandırabiliyorsunuz demek.
    //   },
    //   prepare: ({ title }) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title,
    //       },
    //     };
    //   },
    // },

    // toggle: (state, action) => {
    //   const { id } = action.payload;

    //   const item = state.items.find((item) => item.id === id);

    //   item.completed = !item.completed;
    // },

    // destroy: (state, action) => {
    //   const id = action.payload;
    //   const filtered = state.items.filter((item) => item.id !== id);
    //   state.items = filtered;
    // },

    ChangeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },

  extraReducers: {
    //get todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // ilk istek başladığı anda pending yani bekleme durumunda yani istek başlamış ama herhangi bir respond dönmemiş.
    // Fullfilled olduğunda ise işlem problemsiz bir şekilde çalışıyor demek.

    //add todo

    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },

    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },

    // update todo

    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },

    // delete todo

    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1);
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};

export const { ChangeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer; // Bunu store'da import edip reducer field'ına vereceğiz.
