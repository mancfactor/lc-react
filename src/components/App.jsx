import { useState, useRef, useEffect } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import '../reset.css';
import '../App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';

// zustand or redux as alternative to react context bc of reload on state change issues

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [idForTodo, setIdForTodo] = useLocalStorage('todoId', 1);
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);

  function filterTodos(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  // Runs when state changes
  useEffect(() => {
    // replaced with hook
    //nameInputEl.current.focus();
    //setName(JSON.parse(localStorage.getItem('name')) ?? '');
    return function cleanup() {
      // usually when you have an event listener
      console.log('cleaning up');
    };
  }, []);

  function handleNameInput(event) {
    setName(event.target.value);
    // Replaced with hook
    //localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        idForTodo,
        setIdForTodo,
        filterTodos,
        filter,
        setFilter,
      }}
    >
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            <h2>What is your name?</h2>
            <form action="#">
              <input
                type="text"
                ref={nameInputEl}
                className="todo-input"
                placeholder="What is your name?"
                value={name}
                onChange={handleNameInput}
              />
            </form>
            {name && <p className="name-label">Hello, {name}</p>}
          </div>
          <h2>Todo App</h2>
          <TodoForm />

          {todos.length > 0 ? <TodoList /> : <NoTodos />}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
