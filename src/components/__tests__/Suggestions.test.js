import React from 'react';
import { shallow } from 'enzyme';
import Suggestions from '../Suggestions';
import { stubSearchResults } from '../../../testing/stubs';

describe('Suggestions.jsx', () => {
  let wrapper;
  const props = {
    items: [],
    handleClick: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Suggestions {...props} />);
  });

  it('should render initially', () => {
    expect(wrapper.find('.suggestions').length).toBe(1)
  });

  it('should render correctly when results are found', () => {
    wrapper.setProps({
      items: stubSearchResults,
    });

    const buttons = wrapper.find('ul li button');

    expect(buttons.length).toBe(5);
    expect(wrapper.find('ul li img').length).toBe(5);
  });

  it('should dispatch a click event when clicked', () => {
    wrapper.setProps({
      items: stubSearchResults,
    });

    const buttons = wrapper.find('ul li button');

    console.log(buttons.debug());

    // first.simulate('click');
    // expect(wrapper.instance().handleClick).toHaveBeenCalledTimes(1);
  });
});

