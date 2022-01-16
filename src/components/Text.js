import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

const Text = ({
  light,
  semiBold,
  bold,
  extraBold,
  children,
  center,
  size,
  color,
  style,
  ...otherProps
}) => {
  let textStyles = [styles.defaultStyle, style];

  if (light) textStyles.push(styles.light);
  if (semiBold) textStyles.push(styles.semiBold);
  if (bold) textStyles.push(styles.bold);
  if (extraBold) textStyles.push(styles.extraBold);

  if (center) textStyles.push(styles.center);

  if (size) textStyles.push(styles.size(size));

  if (color) textStyles.push({color});

  return (
    <RNText {...otherProps} style={textStyles}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'Poppins-Regular',
  },
  light: {
    fontFamily: 'Poppins-Light',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  extraBold: {
    fontFamily: 'Poppins-ExtraBold',
  },
  center: {
    textAlign: 'center',
  },
  size: fontSize => ({
    fontSize,
  }),
});
