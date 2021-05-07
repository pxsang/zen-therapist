import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from './Text';
import theme from '../constants/theme';

const VerticalInfo = ({icon, label, value}) => {
  return (
    <View style={theme.block.middleCenter}>
      {typeof icon === 'string' ? (
        <Text bold style={styles.iconText}>
          {icon}
        </Text>
      ) : (
        <Image style={styles.icon} source={icon} />
      )}
      <Text bold>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default VerticalInfo;

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  label: {
    fontSize: 13,
    color: theme.color.gray,
    marginTop: 7,
  },
  iconText: {
    fontSize: 15,
    lineHeight: 15,
    color: theme.color.primary,
    marginBottom: 5,
  },
});
