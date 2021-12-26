import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Layout} from '@ui-kitten/components';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../constants/theme';
import t from '../i18n';

const {width} = Dimensions.get('screen');

const Welcome = ({navigation}) => {
  return (
    <Layout style={[styles.container]}>
      <SafeAreaView style={styles.content}>
        <View>
          <Text style={styles.greeting}>{t('welcome__greeting')}</Text>
          <Text bold style={styles.title}>
            {t('welcome__description')}
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
            {t('login_with_phone')}
          </Button>
          <View style={theme.block.marginTop(20)}>
            <GhostButton onPress={() => navigation.navigate('SignUp')}>
              {t('or_create_my_account')}
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
    width: 3 * width,
    position: 'absolute',
    resizeMode: 'contain',
    left: -width - width / 5,
  },
  footer: {
    justifyContent: 'flex-end',
  },
});
