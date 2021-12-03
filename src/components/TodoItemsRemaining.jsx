import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);
  // useMemo -- caching and filter when it uncaches with second param
  const remaining = useMemo(remainingCalc, [todos]);

  function remainingCalc() {
    console.log('running fx');
    return todos.filter(todo => !todo.isComplete).length;
  }
  return <span>{remaining} items remaining</span>;
}

export default TodoItemsRemaining;
