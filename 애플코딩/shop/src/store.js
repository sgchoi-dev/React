import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import user from "./store/useSlice";

let stock = createSlice({
  name: "stock",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addItem(state, action) {
      let index = state.findIndex((item) => {
        return item.name === action.payload.title;
      });
      if (index === -1) {
        state.push({
          id: action.payload.id,
          name: action.payload.title,
          count: 1,
        });
      } else {
        state[index].count++;
      }
    },
    changeCount(state, action) {
      /*let result = state.find((item) => {
        return item.id === action.payload;
      });
      result.count += 1;*/

      // findIndex 이용하는 방법
      let index = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state[index].count++;
    },
    deleteItem(state, action) {
      let index = state.findIndex((item) => {
        return item.id === action.payload;
      });
      state.splice(index, 1);
    },
  },
});

export let { addItem, changeCount, deleteItem } = stock.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
  },
});
