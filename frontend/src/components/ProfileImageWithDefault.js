import React from 'react';
import defaultPicture from '../assets/images/ProfilePicture.png';

const ProfileImageWithDefault = props => {
  const { image, tempimage } = props;

  let imageSource = defaultPicture;
  if (image) {
    imageSource = image;
  }
  return <img alt={`Profile`} src={tempimage || imageSource} {...props} />;};

export default ProfileImageWithDefault;