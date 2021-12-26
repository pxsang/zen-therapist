import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import Image from './Image';
import theme from '../constants/theme';

const VerticalInfo = ({icon, label, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {typeof icon === 'string' ? (
          <Text bold style={styles.iconText}>
            {icon}
          </Text>
        ) : (
          <Image style={styles.icon} source={icon} />
        )}
      </View>
      <Text bold>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default VerticalInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  iconContainer: {
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 13,
    color: theme.color.gray,
    marginTop: 7,
    textAlign: 'center',
  },
  iconText: {
    fontSize: 15,
    color: theme.color.primary,
  },
});
