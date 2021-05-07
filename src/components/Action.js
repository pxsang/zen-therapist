import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Text from './Text';

const Action = ({icon, iconSize = 24, label, onPress}) => {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress && onPress()}>
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
    flex: 1,
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
