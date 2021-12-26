import React from 'react';
import FastImage from 'react-native-fast-image';

export const ResizeMode = FastImage.resizeMode;

const Image = props => {
  return <FastImage resizeMode={FastImage.resizeMode.cover} {...props} />;
};

export default Image;
