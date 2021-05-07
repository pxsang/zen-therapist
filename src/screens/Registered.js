import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Layout} from '@ui-kitten/components';
import Text from '../components/Text';
import Button from '../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../constants/theme';

const Registered = props => {
  const {navigation} = props;

  return (
    <Layout style={[styles.container]}>
      <SafeAreaView style={styles.content}>
        <View>
          <Text bold style={styles.title}>
            Thank you!
          </Text>
          <Text light style={styles.description}>
            {
              'Thank you for registering with zen. Please complete your registration and be activated by visiting our office.'
            }
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
          <Button icon="arrow-forward-outline" onPress={() => navigation.navigate('Root')}>Go to Profile</Button>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default Registered;

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
  description: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing.s,
  },
  imageWrapper: {
    paddingVertical: theme.spacing.l,
  },
  image: {
    position: 'absolute',
    right: -500,
  },
  footer: {
    justifyContent: 'flex-end',
  },
});
