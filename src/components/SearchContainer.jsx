import React from 'react';
import PropTypes from 'prop-types';
import SearchField from './SearchField';
import Suggestions from './Suggestions';
import UserInfo from './UserInfo';

export const SearchContainer = (props) => {
  const {
    state,
    clear,
    handleChange,
    onClick,
  } = props;
  return (
    <React.Fragment>
      <section className="search-wrapper">
        <SearchField
          text={state.inputText}
          handleChange={handleChange}
          clear={clear}
        />

        {state.showSuggestions ? (
          <Suggestions
            items={state.suggestions}
            handleClick={onClick}
          />
        ) : null}
      </section>

      <p className="error">{state.error}</p>
      {state.user ? <UserInfo user={state.userData} /> : null}
    </React.Fragment>
  );
};

SearchContainer.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchContainer;
