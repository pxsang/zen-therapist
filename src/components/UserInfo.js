import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import Image from './Image';
import theme from '../constants/theme';
import {ratingFormat} from '../helpers/display';

const UserInfo = ({data}) => {
  const {name, avatar, rating} = data;

  return (
    <View style={theme.block.rowMiddle}>
      <Image
        style={styles.avatar}
        source={
          avatar ? {uri: avatar} : require('../assets/icons/user-avatar.png')
        }
      />
      <View style={theme.block.marginLeft(10)}>
        <Text bold size={16}>
          {/* {getFullName(first_name, last_name)} */}
          {name}
        </Text>
        <View style={[theme.block.rowMiddle, theme.block.marginTop(5)]}>
          <Image
            style={[styles.starIcon, theme.block.marginRight(5)]}
            source={require('../assets/icons/star.png')}
          />
          <Text light style={styles.rating}>
            {ratingFormat(rating || 0)}
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
