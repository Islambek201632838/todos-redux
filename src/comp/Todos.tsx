import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../utils/store';
import { createTodo, updateFilter, fetchDoneTodos } from '../utils/TodoSlice';
import './todos.scss'

export function TodoComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.todos.filter);

  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const handleCreateTodo = async () => {
  if (inputTitle.length <= 30) {
    await dispatch(createTodo({ 
      title: inputTitle, 
      description: inputDescription,
      status: filter 
    }));
    setInputTitle('');
    setInputDescription('');
  }
};


  const handleFilter = (newFilter: 'Todo' | 'In Progress' | 'Done') => {
    dispatch(updateFilter(newFilter));
  };

  const handleFetchDoneTodos = async () => {
    await dispatch(fetchDoneTodos());
  };

  return (
    <div className='todo-app'>
      <h1>Todo App</h1>
      <button className='btn' onClick={handleFetchDoneTodos}>Get done todos</button>
      <select className="select-filter" 
              value={filter} 
              onChange={e => handleFilter(e.target.value as 'Todo' | 'In Progress' | 'Done')}>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <input className="input-title" 
             type="text" 
             value={inputTitle} 
             onChange={e => setInputTitle(e.target.value)}
             required />
      <textarea value={inputDescription}
                className="input-description" 
                onChange={e => setInputDescription(e.target.value)}
                required />
      <button className="btn"
              onClick={handleCreateTodo}>Create todo</button>
      <ul>
      {
      todos.filter(todo => todo.status === filter).map((todo) => (
          todo.title ? (
            <li key={todo.id}>
              <h4>{todo.title}</h4>
              <p>{todo.description}</p> 
              <p>Status: {todo.status}</p> 
            </li>
          ) : null
        ))
      }
      </ul>
    </div>
    
  );
}
