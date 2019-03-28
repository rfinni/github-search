import React from 'react';
import { shallow } from 'enzyme';
import Suggestions from '../Suggestions';
import { stubSearchResults } from '../../../testing/stubs';

describe('Suggestions.jsx', () => {
  const props = {
    items: stubSearchResults,
    handleClick: jest.fn(),
  };

  const wrapper = shallow(<Suggestions {...props} />);

  it('should render the correct amount of items when results are found', () => {
    expect(wrapper.find('.suggestions').length).toBe(1)
    expect(wrapper.find('ul li button').length).toBe(5);
    expect(wrapper.find('ul li img').length).toBe(5);
  });

  it('should be called with the correct info when clicked', () => {
    const firstItem = wrapper.find('ul li').first();
    firstItem.find('button').simulate('click', {});
    expect(props.handleClick).toHaveBeenCalledWith({}, 'rfinnie');
  });
});

