import React from 'react';
import {StyleSheet} from 'react-native';
import {Input as UIInput} from '@ui-kitten/components';
import theme from '../constants/theme';
import Text from './Text';

const Input = ({label, value = '', ...other}) => {
  return (
    <UIInput
      {...other}
      value={value}
      label={<Text style={styles.label}>{label}</Text>}
      style={styles.input}
      textStyle={!value?.length ? styles.placeholder : styles.text}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.color.white,
    borderRadius: 0,
    borderLeftColor: theme.color.white,
    borderTopColor: theme.color.white,
    borderRightColor: theme.color.white,
  },
  label: {
    fontSize: 12,
    fontWeight: '300',
    color: theme.color.primary,
  },
  text: {
    fontSize: 18,
    color: theme.color.primary,
  },
  placeholder: {
    fontSize: 14,
  },
});
