import React from 'react';
import PropTypes from 'prop-types';

const UserImg = ({ user }) => (
  <div className="image-wrapper">
    <img className="user-image" src={user.avatar} alt={user.name} />
  </div>
);

UserImg.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserImg;
