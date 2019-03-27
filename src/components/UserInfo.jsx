import React from 'react';
import PropTypes from 'prop-types';
import UserImg from './UserImg';
import UserData from './UserData';

const UserInfo = ({
  user,
}) => (
  <div className="user-info">
    <a rel="noopener noreferrer" href={user.url} target="_blank">
      <UserImg user={user} />
      <UserData user={user} />
    </a>
  </div>
);

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
