import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Image from '../components/Image';

const {width, height} = Dimensions.get('screen');

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo-1.png')}
        style={styles.image}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
  },
});
