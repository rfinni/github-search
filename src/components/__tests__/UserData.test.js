import React from 'react';
import renderer from 'react-test-renderer';
import UserData from '../UserData';
import { stubUser } from '../../../testing/stubs';

describe('UserData.jsx', () => {
  const wrapper = renderer.create(<UserData user={stubUser} />).toJSON();
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

