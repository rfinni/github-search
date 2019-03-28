import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../App';
import {
  stubSearchResults,
} from '../../../testing/stubs';

jest.mock('../../services/services', () => ({
  searchForUserSuggestions: jest.fn(() => {
    return {
      items: [
        {
          "login": "test",
          "id": 123456,
        },
        {
          "login": "second",
          "id": 111111,
        },
      ]
    }
  }),
  requestUser: jest.fn(() => {
    return {
      "login": "test",
      "id": 1593553,
    }
  }),
}));

describe('App.jsx', () => {
  let wrapper;
  const defaultState = {
    isLoading: false,
    suggestions: [],
    showSuggestions: false,
    userData: {},
    inputValue: '',
    displayError: false,
  }

  // Mock the use of setTimeout
  jest.useFakeTimers();

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render snapshot correctly', () => {
    const wrapper = renderer.create(<App />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle input change correctly', () => {
    const instance = wrapper.instance();
    instance.handleChange({ target: { value: 'asdf' } });
    expect(wrapper.state().inputValue).toBe('asdf');
  });

  it('should handle clearing data correctly', () => {
    const instance = wrapper.instance();
    const newState = {
      suggestions: stubSearchResults,
      showSuggestions: true,
      inputValue: 'asdf',
      userData: {},
      displayError: false,
      isLoading: false,
    };
    wrapper.setState(newState);
    expect(wrapper.state()).toEqual(newState);

    instance.clearInput();
    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should handle toggling the loading state', () => {
    const instance = wrapper.instance();

    expect(wrapper.state().isLoading).toBe(false);
    instance.toggleLoadingState();
    expect(wrapper.state().isLoading).toBe(true);
  });

  it('should successfully search suggestions', async () => {
    const instance = wrapper.instance();
    const loadingSpy = jest.spyOn(instance, 'toggleLoadingState');

    await instance.getSuggestions('asdf');
    jest.advanceTimersByTime(1000);

    expect(wrapper.state().showSuggestions).toBe(true);
    expect(wrapper.state().suggestions).toEqual([{
      "login": "test",
      "id": 123456,
      },
      {
      "login": "second",
      "id": 111111,
    }]);
    expect(loadingSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle clicking on a search suggestion', () => {
    const instance = wrapper.instance();
    const getUserDataSpy = jest.spyOn(instance, 'getUserData');
    instance.handleClick({ preventDefault: jest.fn() }, {
      "login": "second",
      "id": 111111,
    });
    expect(getUserDataSpy).toHaveBeenCalledWith({
      "login": "second",
      "id": 111111,
    })
  });

  it('should successfully request more user data', async () => {
    const instance = wrapper.instance();
    const loadingSpy = jest.spyOn(instance, 'toggleLoadingState');
    const updateSearchStateSpy = jest.spyOn(instance, 'updateSearchState');

    await instance.getUserData('test');
    expect(updateSearchStateSpy).toHaveBeenCalledWith({
      "login": "test",
      "id": 1593553,
    });
    expect(loadingSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle displaying an error when necessary', () => {
    const instance = wrapper.instance();
    instance.displayError();
    expect(wrapper.state().displayError).toBe('An error occurred. Please try again.');
  });
});
