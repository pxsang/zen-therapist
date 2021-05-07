import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';

const GhostButton = ({children, onPress}) => {
  let content;
  if (typeof children === 'string') {
    content = <Text style={styles.text}>{children}</Text>;
  } else {
    content = children;
  }
  return (
    <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
      <View style={styles.container}>{content}</View>
    </TouchableWithoutFeedback>
  );
};

export default GhostButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 17,
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
  },
});
