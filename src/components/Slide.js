import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Image from '../components/Image';
import rewardsTheme from '../constants/theme';
import Text from './Text';

const {width} = Dimensions.get('screen');

const Slide = ({title, description, image}) => {
  const safeArea = useSafeAreaInsets();

  return (
    <View style={styles.container(safeArea)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Image source={image} style={styles.image} />
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: safeArea => ({
    width,
    alignItems: 'center',
    paddingTop: safeArea.top + 40,
  }),
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: rewardsTheme.color.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: rewardsTheme.color.primary,
    marginBottom: 30,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
});
