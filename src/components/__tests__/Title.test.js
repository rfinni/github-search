import React from 'react';
import renderer from 'react-test-renderer';
import Title from '../Title';

describe('Title.jsx', () => {
  const wrapper = renderer.create(<Title />).toJSON();
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

