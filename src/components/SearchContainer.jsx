import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import SearchField from './SearchField';
import Suggestions from './Suggestions';
import UserInfo from './UserInfo';

export const SearchContainer = ({
  isLoading,
  suggestions,
  userData,
  inputValue,
  handleClearInput,
  handleChange,
  onClick,
}) => (
  <React.Fragment>
    <section className="search-wrapper">
      <SearchField
        value={inputValue}
        handleChange={handleChange}
        handleClear={handleClearInput}
      />

      {suggestions ? (
        <Suggestions
          items={suggestions}
          handleClick={onClick}
        />
      ) : null}
    </section>
    { !isEmpty(userData) && <UserInfo user={userData} /> }
  </React.Fragment>
);

SearchContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  suggestions: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleClearInput: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchContainer;
