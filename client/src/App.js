import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Provider } from "react-redux";
import store from "./store";


function App() {
  return (
    <Provider store={store}>
    <div>
      <TodoList />
      <TodoForm />
    </div>
    </Provider>
  );
}

export default App;