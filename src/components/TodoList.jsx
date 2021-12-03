import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCheckAll from './TodoCheckAll';
import TodoFilter from './TodoFilter';
import useToggle from '../hooks/useToggle';

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remaining: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
};

function TodoList(props) {
  const [filter, setFilter] = useState('all');
  const [oneVisible, setOneVisible] = useToggle(true);
  const [twoVisible, setTwoVisible] = useToggle(true);
  return (
    <>
      <ul className="todo-list">
        {props.filterTodos(filter).map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => props.completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.markAsEditing(todo.id)}
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
                  onBlur={event => props.updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      props.updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      props.markAsEditing(todo.id);
                    }
                  }}
                />
              )}
            </div>
            {/* pass the onClick as a callback if you dont want it to run when the component is instantiated */}
            <button
              className="x-button"
              onClick={() => props.deleteTodo(todo.id)}
            >
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
            <TodoCheckAll completeAllTodos={props.completeAllTodos} />
          </div>

          <TodoItemsRemaining remaining={props.remaining} />
        </div>
      )}

      {twoVisible && (
        <div className="other-buttons-container">
          <TodoFilter
            filterTodos={props.filterTodos}
            filter={filter}
            setFilter={setFilter}
          />

          <div>
            <TodoClearCompleted clearCompleted={props.clearCompleted} />
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
