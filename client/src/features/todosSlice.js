import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
  
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos = [...state.todos, action.payload];
    },
    updateTodoSuccess: (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
getTodosStart,
getTodosSuccess,
addTodoSuccess,
updateTodoSuccess,
deleteTodoSuccess,
setError,
} = todosSlice.actions;

export const fetchTodos = () => async (dispatch) => {
try {
dispatch(getTodosStart());
const response = await axios.get('https://rlmacapagal-automatic-computing-machine-vjgxwgxrv9g3w5j6-5000.preview.app.github.dev/todos');
dispatch(getTodosSuccess(response.data));
} catch (error) {
dispatch(setError(error.message));
}
};

export const addTodo = (todo) => async (dispatch) => {
try {
dispatch(getTodosStart());
const response = await axios.post('https://rlmacapagal-automatic-computing-machine-vjgxwgxrv9g3w5j6-5000.preview.app.github.dev/todos/add', todo);
dispatch(addTodoSuccess(response.data));
} catch (error) {
dispatch(setError(error.message));
}
};

export const updateTodo = (id, todo) => async (dispatch) => {
try {
dispatch(getTodosStart());
const response = await axios.post(`https://rlmacapagal-automatic-computing-machine-vjgxwgxrv9g3w5j6-5000.preview.app.github.dev/todos/update/${id}`, todo);

dispatch(updateTodoSuccess(response.data));
} catch (error) {
dispatch(setError(error.message));
}
};

export const deleteTodo = (id) => async (dispatch) => {
try {
dispatch(getTodosStart());
await axios.delete(`https://rlmacapagal-automatic-computing-machine-vjgxwgxrv9g3w5j6-5000.preview.app.github.dev/todos/${id}`);

dispatch(deleteTodoSuccess(id));
} catch (error) {
dispatch(setError(error.message));
}
};

export const selectTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.todos.loading;
export const selectError = (state) => state.todos.error;

export default todosSlice.reducer;
