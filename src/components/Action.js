import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from './Text';
import Image from './Image';

const Action = ({icon, iconSize = 24, label, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: iconSize, height: iconSize, resizeMode: 'contain' }}
            source={icon}
          />
        </View>
        <Text center>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Action;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    marginBottom: 15,
    borderRadius: 24,
    backgroundColor: '#DADEE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
