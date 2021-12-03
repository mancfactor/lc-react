import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCheckAll from './TodoCheckAll';
import TodoFilter from './TodoFilter';
import useToggle from '../hooks/useToggle';

function TodoList() {
  const [oneVisible, setOneVisible] = useToggle(true);
  const [twoVisible, setTwoVisible] = useToggle(true);
  const { todos, setTodos, filter, filterTodos } = useContext(TodosContext);

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
  return (
    <>
      <ul className="todo-list">
        {filterTodos(filter).map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                  onBlur={event => updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      markAsEditing(todo.id);
                    }
                  }}
                />
              )}
            </div>
            {/* pass the onClick as a callback if you dont want it to run when the component is instantiated */}
            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="toggles-container">
        <button className="button" onClick={setOneVisible}>
          Toggle 1
        </button>
        <button className="button" onClick={setTwoVisible}>
          Toggle 2
        </button>
      </div>

      {oneVisible && (
        <div className="check-all-container">
          <div>
            <TodoCheckAll />
          </div>

          <TodoItemsRemaining />
        </div>
      )}

      {twoVisible && (
        <div className="other-buttons-container">
          <TodoFilter />

          <div>
            <TodoClearCompleted />
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
