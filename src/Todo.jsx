import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      if (editIndex === -1) {
        setTodos([...todos, { text: newTodo, completed: false }]);
      } else {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].text = newTodo;
        setTodos(updatedTodos);
        setEditIndex(-1);
      }
      setNewTodo('');
    }
  };

  const handleEditTodo = (index) => {
    setNewTodo(todos[index].text);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h2>TodoList</h2>
      <div className="todo-form">
        <input type="text" value={newTodo} onChange={handleInputChange} className="todo-input" />
        <button onClick={handleAddTodo} className="todo-button">
          {editIndex === -1 ? 'Add Todo' : 'Update Todo'}
        </button>
      </div>
      <ul className="TodoList">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
              className="checkbox"
            />
            <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>{todo.text}</span>
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;