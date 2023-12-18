// store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './TodoSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
//ss

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
