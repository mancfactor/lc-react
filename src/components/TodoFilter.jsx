import React from 'react';
import PropTypes from 'prop-types';

TodoFilter.propTypes = {
  filterTodos: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

function TodoFilter(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.setFilter('all');
          props.filterTodos(props.filter);
        }}
        className={`button filter-button  ${
          props.filter === 'all' ? 'filter-button-active' : ''
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          props.setFilter('active');
          props.filterTodos(props.filter);
        }}
        className={`button filter-button  ${
          props.filter === 'active' ? 'filter-button-active' : ''
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          props.setFilter('completed');
          props.filterTodos(props.filter);
        }}
        className={`button filter-button  ${
          props.filter === 'completed' ? 'filter-button-active' : ''
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
