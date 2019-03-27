import React from 'react';
import renderer from 'react-test-renderer';
import UserInfo from '../UserInfo';
import { stubUser } from '../../../testing/stubs';

describe('UserInfo.jsx', () => {
  const wrapper = renderer.create(<UserInfo user={stubUser} />).toJSON();
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

