import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Layout} from '@ui-kitten/components';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../constants/theme';

const Welcome = ({navigation}) => {
  return (
    <Layout style={[styles.container]}>
      <SafeAreaView style={styles.content}>
        <View>
          <Text style={styles.greeting}>Hello, nice to meet you!</Text>
          <Text bold style={styles.title}>
            Get a new experience
          </Text>
          <Text bold style={styles.title}>
            in Health & Wellness
          </Text>
          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require('../assets/images/login-background.png')}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            icon="arrow-forward-outline"
            onPress={() => navigation.navigate('PhoneLogin')}>
            Login with Phone
          </Button>
          <View style={theme.block.marginTop(20)}>
            <GhostButton onPress={() => navigation.navigate('SignUp')}>
              Or Create My Account
            </GhostButton>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 14,
    marginBottom: theme.spacing.s,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  imageWrapper: {
    paddingVertical: theme.spacing.l,
  },
  imageContainer: {
    // width: width * 4,
    // marginLeft: -width * 1.4,
    // transform: [{
    //   translateX:
    // }]
  },
  image: {
    position: 'absolute',
    right: -500,
  },
  footer: {
    justifyContent: 'flex-end',
  },
});
