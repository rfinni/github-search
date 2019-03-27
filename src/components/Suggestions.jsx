import React from 'react';
import PropTypes from 'prop-types';

const renderItems = (items, handleClick) => items.map((item, i) => (
  <li key={i}>
    <button onClick={e => handleClick(e, item.login)}>
      <img className="avatar" src={item.avatar_url} alt={item.login} />
      {item.login}
    </button>
  </li>
));

const Suggestions = ({
  items,
  handleClick,
}) => (
  <nav className="suggestions">
    <ul>
      {items.length ? (
        renderItems(items, handleClick)
      ) : (
        <li className="no-items">Nothing was found.</li>
      )}
    </ul>
  </nav>
);

Suggestions.propTypes = {
  items: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Suggestions;
