import React, { useState } from 'react';
import './App.css';

function Todo() {
  // State for the list of todos
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Build a todo app", completed: false },
    { id: 3, text: "Master JavaScript", completed: false }
  ]);

  // State for the input field
  const [inputValue, setInputValue] = useState('');

  // State for filter (all, active, completed)
  const [filter, setFilter] = useState('all');

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (inputValue.trim() === '') return; // Don't add empty todos
    
    const newTodo = {
      id: Date.now(), // Simple way to generate unique IDs
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]); // Add new todo to the list
    setInputValue(''); // Clear input field
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Get todos based on current filter
  const getFilteredTodos = () => {
    switch(filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  // Calculate stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className="App">
      <h1>📝 My Todo List</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add Todo</button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All ({totalTodos})
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active ({activeTodos})
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed ({completedTodos})
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {getFilteredTodos().length === 0 ? (
          <p className="empty-message">No todos to show! Add one above ☝️</p>
        ) : (
          getFilteredTodos().map(todo => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span 
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
                aria-label="Delete todo"
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Footer with actions */}
      {totalTodos > 0 && (
        <div className="todo-footer">
          <span className="todo-count">
            {activeTodos} item{activeTodos !== 1 ? 's' : ''} left
          </span>
          {completedTodos > 0 && (
            <button onClick={clearCompleted} className="clear-btn">
              Clear completed ({completedTodos})
            </button>
          )}
        </div>
      )}

      {/* Motivational message based on completion */}
      {completedTodos === totalTodos && totalTodos > 0 && (
        <div className="motivation-message">
          🎉 All done! You're a rockstar! 🌟
        </div>
      )}
    </div>
  );
}

export default Todo;