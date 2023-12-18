import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done';
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
  filter: 'Todo' | 'In Progress' | 'Done';
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  filter: 'Todo',
};

// Async actions

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (todo: Omit<Todo, 'id'>, { getState }) => {
        const { todos } = (getState() as RootState).todos;
        const id = todos.length + 1;
        return { ...todo, id };
    }
  );
  

export const fetchDoneTodos = createAsyncThunk(
  'todos/fetchDoneTodos',
  async (_, { getState }) => {
    const { todos } = (getState() as RootState).todos;
    return todos.filter(todo => todo.status === 'Done');
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<'Todo' | 'In Progress' | 'Done'>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(fetchDoneTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const { updateFilter } = todosSlice.actions;
export default todosSlice.reducer;
