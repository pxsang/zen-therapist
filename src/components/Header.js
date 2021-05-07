import React from 'react';
import {View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Platform} from 'react-native';
import theme from '../constants/theme';
import {Layout, Icon, Text} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('screen');

const Header = ({title, navigation}) => {
  const safeArea = useSafeAreaInsets();
  // const { options } = scene.descriptor;
  // const title =
  //   options.headerTitle !== undefined
  //     ? options.headerTitle
  //     : options.title !== undefined
  //     ? options.title
  //     : scene.route.name;

  if (Platform.OS === 'ios') {
    return (
      <Layout style={{height: 200}}>
        <View style={styles.backgroundWrapper}>
          <View style={styles.backgroundContainer}>
            <Image style={styles.backgroundImage} source={require('../assets/images/Background.png')} />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={[styles.titleContent, { paddingTop: safeArea.top + 25, paddingHorizontal: 20 }]}>
            <Icon
              style={styles.icon}
              fill='#FFFFFF'
              name='arrow-back-outline'
            />
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Layout>
    );
  }

  return (
  <Layout style={{
    paddingTop: safeArea.top,
    backgroundColor: theme.color.primary,
  }}>
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={[styles.titleContent, { paddingHorizontal: 20, height: 60, alignItems: 'center' }]}>
        <Icon
          style={styles.icon}
          fill='#FFFFFF'
          name='arrow-back-outline'
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  </Layout>
  );
};

export default Header;

Header.defaultProps = {
  title: 'Back',
};

const styles = StyleSheet.create({
  backgroundWrapper: {
    width: width,
    height: 200,
    position: 'absolute',
  },
  backgroundContainer: {
    position: 'absolute',
    bottom: 0,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    left: -525,
    resizeMode: 'contain',
  },
  icon: {
    width: 24,
    height: 24,
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginLeft: 20,
  },
});
