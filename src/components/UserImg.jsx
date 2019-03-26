import React from 'react';
import PropTypes from 'prop-types';

const UserImg = ({
  user,
}) => (
  <div className="image-wrapper">
    <a className="user-image" rel="noopener noreferrer" href={user.url} target="_blank">
      <img src={user.avatar} alt={user.name} />
    </a>
  </div>
);

UserImg.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserImg;
