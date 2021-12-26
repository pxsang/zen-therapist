import React from 'react';
import {View} from 'react-native';

const HalfCircle = ({color}) => {
  return (
    <View style={{
      width: 120,
      height: 60,
      overflow: 'hidden',
    }}>
      <View style={{
        backgroundColor: color,
        width: 120,
        height: 120,
        borderRadius: 60,
      }}></View>
    </View>
  )
}

export default HalfCircle;
