import React from 'react';
import PropTypes from 'prop-types';

const SearchField = ({
  value,
  handleClear,
  handleChange,
}) => (
  <div className="search-field">
    <input
      type="text"
      className="search"
      id="search"
      name="search"
      placeholder="Search for a GitHub username"
      value={value}
      onChange={e => handleChange(e)}
    />
    {value.length > 1 && (
      <button
        type="button"
        onClick={handleClear}
        className="clear"
      >
        <svg width="20px" height="20px" viewBox="0 0 768 768">
          <path d="M608 128q13.75 0 22.875 9.125t9.125 22.875q0 13.5-9.25 22.75l-201.5 201.25 201.5 201.25q9.25 9.25 9.25 22.75 0 13.75-9.125 22.875t-22.875 9.125q-13.5 0-22.75-9.25l-201.25-201.5-201.25 201.5q-9.25 9.25-22.75 9.25-13.75 0-22.875-9.125t-9.125-22.875q0-13.5 9.25-22.75l201.5-201.25-201.5-201.25q-9.25-9.25-9.25-22.75 0-13.75 9.125-22.875t22.875-9.125q13.5 0 22.75 9.25l201.25 201.5 201.25-201.5q9.25-9.25 22.75-9.25z" />
        </svg>
        <span>Clear</span>
      </button>
    )}
  </div>
);

SearchField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchField;
