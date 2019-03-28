import React from 'react';
import renderer from 'react-test-renderer';
import SearchContainer from '../SearchContainer';

describe('SearchContainer.jsx', () => {
  const props = {
    isLoading: false,
    showSuggestions: false,
    suggestions: [],
    userData: {},
    inputValue: '',
    handleClearInput: jest.fn(),
    handleChange: jest.fn(),
    onClick: jest.fn(),
  }

  it('should render snapshot correctly', () => {
    const wrapper = renderer.create(<SearchContainer {...props} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
