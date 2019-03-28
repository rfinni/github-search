import React from 'react';
import { shallow } from 'enzyme';
import SearchField from '../SearchField';

describe('SearchField.jsx', () => {
  const props = {
    isLoading: false,
    value: '',
    handleClear: jest.fn(),
    handleChange: jest.fn(),
  };

  const wrapper = shallow(<SearchField {...props} />);

  it('should render correctly initially', () => {
    expect(wrapper.find('.search-field').length).toBe(1);
    expect(wrapper.find('.loading-state').length).toBe(0);
    expect(wrapper.find('.clear').length).toBe(0);
  });

  it('should display a loading state when necessary', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('.loading-state').length).toBe(1);
  });

  it('should display a button to clear the input', () => {
    wrapper.setProps({ value: 'asdf '});
    expect(wrapper.find('.clear').length).toBe(1);
  });

  it('should call the handleChange prop with the correct value', () => {
    wrapper.find('.search').simulate('change', { target: { value: 'asdf' } });
    expect(props.handleChange).toHaveBeenCalledWith({ target: { value: 'asdf' } });
  });

  it('should call handleClear when necessary', () => {
    wrapper.find('.clear').simulate('click', { target: {}});
    expect(props.handleClear).toHaveBeenCalledWith({ target: {}});
  });
});
