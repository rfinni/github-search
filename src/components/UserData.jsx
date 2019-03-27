import React from 'react';
import PropTypes from 'prop-types';

const UserData = ({ user }) => (
  <div className="user-data">
    <span className="name">{user.name} ({user.login})</span>
    <span>{user.location}</span>
    <span>Joined GitHub in {new Date(user.joined).getFullYear()}</span>
  </div>
);

UserData.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserData;
