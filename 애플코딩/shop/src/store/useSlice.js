import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "park"; // array나 object의 경우 직접 수정 가능 // immer.js 의 도움
    },
    increase(state, action) {
      // increase(a)
      state.age += action.payload; // a만큼 더해줘라.
    },
  },
});

export let { changeName, increase } = user.actions;

export default user;
