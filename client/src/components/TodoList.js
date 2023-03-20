import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, selectTodos, selectLoading, selectError } from '../features/todosSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
            <li key={todo._id}>{todo.description}</li>
        ))}

      </ul>
    </div>
    );
};


export default TodoList;