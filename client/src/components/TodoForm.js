import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todosSlice';

const TodoForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (description.trim()) {
      dispatch(addTodo({
        description: description.trim(),
        completed: false,
      }));
      setDescription('');
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={description} onChange={handleDescriptionChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;