import React from 'react';
import {View, Text} from 'react-native';

const HalfCircle = ({color}) => {
  return (
    <View style={{
      width: 160,
      height: 80,
      overflow: 'hidden',
    }}>
      <View style={{
        backgroundColor: color,
        width: 160,
        height: 160,
        borderRadius: 80,
      }}></View>
    </View>
  )
}

export default HalfCircle;
