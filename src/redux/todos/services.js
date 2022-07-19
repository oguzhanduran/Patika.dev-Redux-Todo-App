import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get todo

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
