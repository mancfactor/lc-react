import React, { useContext } from 'react';

import { TodosContext } from '../context/TodosContext';

function TodoFilter() {
  const { filter, setFilter, filterTodos } = useContext(TodosContext);
  return (
    <div>
      <button
        onClick={() => {
          setFilter('all');
          filterTodos(filter);
        }}
        className={`button filter-button  ${
          filter === 'all' ? 'filter-button-active' : ''
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter('active');
          filterTodos(filter);
        }}
        className={`button filter-button  ${
          filter === 'active' ? 'filter-button-active' : ''
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          setFilter('completed');
          filterTodos(filter);
        }}
        className={`button filter-button  ${
          filter === 'completed' ? 'filter-button-active' : ''
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
