import React from 'react';
import renderer from 'react-test-renderer';
import UserImg from '../UserImg';
import { stubUser } from '../../../testing/stubs';

describe('UserImg.jsx', () => {
  const wrapper = renderer.create(<UserImg user={stubUser} />).toJSON();
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

