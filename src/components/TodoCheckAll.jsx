import React from 'react';
import PropTypes from 'prop-types';

TodoCheckAll.propTypes = {
  completeAllTodos: PropTypes.func.isRequired,
};

function TodoCheckAll(props) {
  return (
    <div className="button" onClick={props.completeAllTodos}>
      Check All
    </div>
  );
}

export default TodoCheckAll;
