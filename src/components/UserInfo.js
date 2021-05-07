import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Text from './Text';
import theme from '../constants/theme';

const UserInfo = () => {
  return (
    <View style={theme.block.rowMiddle}>
      <Image
        style={styles.avatar}
        source={require('../assets/icons/user-avatar.png')}
      />
      <View style={theme.block.marginLeft(10)}>
        <Text bold size={16}>
          Poppet Celdran
        </Text>
        <View style={[theme.block.rowMiddle, theme.block.marginTop(5)]}>
          <Image
            style={[styles.starIcon, theme.block.marginRight(5)]}
            source={require('../assets/icons/star.png')}
          />
          <Text light style={styles.rating}>
            4,75
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  starIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  rating: {
    fontSize: 12,
    color: '#2DBB54',
  },
});
