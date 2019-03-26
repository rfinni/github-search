import React from 'react';
import PropTypes from 'prop-types';
import UserImg from './UserImg';
import UserData from './UserData';

const UserInfo = ({
  user,
}) => (
  <div className="user-info">
    <UserImg user={user} />
    <UserData user={user} />
  </div>
);

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
