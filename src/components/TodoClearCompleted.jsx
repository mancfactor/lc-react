import React, { useContext } from 'react';

import { TodosContext } from '../context/TodosContext';

function TodoClearCompleted() {
  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  const { todos, setTodos } = useContext(TodosContext);
  return (
    <button className="button" onClick={clearCompleted}>
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
