import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {interpolateColor} from 'react-native-redash/lib/module/v1';
import theme from '../constants/theme';

const Dot = ({index, currentIndex}) => {
  const backgroundColor = interpolateColor(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [theme.color.white, theme.color.primary, theme.color.white],
    extrapolate: Extrapolate.CLAMP,
  });

  const borderColor = interpolateColor(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [theme.color.border, theme.color.primary, theme.color.border],
    extrapolate: Extrapolate.CLAMP,
  });

  return <Animated.View style={[styles.dot, {backgroundColor, borderColor}]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    borderStyle: 'solid',
    marginHorizontal: 4.5,
  },
});
