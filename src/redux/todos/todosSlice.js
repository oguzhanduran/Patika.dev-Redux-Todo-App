import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync/",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`
    );
    return res.data;
  }
);

// Biz eğer asengron bir işlem yapmak istiyorsak API'ye gitmek veya farklı bir asengron işlem bu noktada middleware'lara ihtiyacımız olabiliyor mesela bir logging işlemi yapmak istiyorsak ve log tutmak istiyorsak bu state değişimi ile alakalı o zamanda bir middleware yazmamız gerekecek ve ya hazır yazılmış bir middleware kullanmamız gerekecek. Bizim burda amacımız API'ye gidip ordan veriyi almak burda thunk'ı kullandık zaten redux tarafına baktığımızda kullanılan araç thunk genelde.

// Thunk'ın 2 parametresi var 1. action name'i belirtiyorum. 2.'de data'yı fetch edecek fonksiyonu. Sonra createSlice'ın içinde extraReducers denilen bir tanım var. Pending fullfilled rejected tanımlarını bizim yerimize oluşturuyor. Ben pending, fulfilled, rejected durumlarında state'in nasıl güncellenmesi gerektiğini içlerinde belirtiyorum.

// Sonra oluşturduğum getTodosAsync tanımımı kullanmak istediğim componentte içeri import ediyorum. Sonra useEffect içersinde component mount olduğu anda dispatch ediyorum. Ve eğer isLoading aktifse loading'de gösteriyoruz hata varsa error'da gösteriyoruz.

//  add todo

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      data
    );
    return res.data;
  }
);

// update todo

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    // data parametresinin içinde güncellenmek istenen todo'nun id'si olacak ve ne olarak güncellenecek true mu olacak completed false'mu olacak onu alacağımız ifadeler bu data'nın içersinde olacak.

    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return res.data;
  }
);

// delete todo

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`
    );
    return id;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addNewTodoIsLoading: false,
    addNewTodoError: null,
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
      state.addNewTodoIsLoading = true;
    },

    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodoIsLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoIsLoading = false;
      state.addNewTodoError = action.error.message;
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
