import { useRef, useEffect, useMemo } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import '../reset.css';
import '../App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  /* Replaced with useLocalStorage hook - hooks for repetitive tasks
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]);
  const [idForTodo, setIdForTodo] = useState(4);
  */
  const [idForTodo, setIdForTodo] = useLocalStorage('todoId', 1);
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);

  function deleteTodo(id) {
    console.log('delete todo id: ' + id);
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    console.log('completing todo id: ' + id);
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    console.log('editing todo id: ' + id);
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // useMemo -- caching and filter when it uncaches with second param
  const remaining = useMemo(remainingCalc, [todos]);

  function remainingCalc() {
    console.log('running fx');
    return todos.filter(todo => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true;
      return todo;
    });
    setTodos(updatedTodos);
  }

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
    <TodosContext.Provider value={{ todos, setTodos, idForTodo, setIdForTodo }}>
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

          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              completeTodo={completeTodo}
              markAsEditing={markAsEditing}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
              remaining={remaining}
              clearCompleted={clearCompleted}
              completeAllTodos={completeAllTodos}
              filterTodos={filterTodos}
            />
          ) : (
            <NoTodos />
          )}
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
