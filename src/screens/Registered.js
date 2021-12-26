import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import Text from '../components/Text';
import Button from '../components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../constants/theme';
import t from '../i18n';
import {registered} from '../redux/actions/user';

const Registered = props => {
  const dispatch = useDispatch();
  const {navigation} = props;

  return (
    <Layout style={[styles.container]}>
      <SafeAreaView style={styles.content}>
        <View>
          <Text bold style={styles.title}>
            {t('thank_you')}
          </Text>
          <Text light style={styles.description}>
            {t('registered_description')}
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
            onPress={() => {
              dispatch(registered());
              navigation.navigate('Dashboard');
            }}>
            {t('go_to_profile')}
          </Button>
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
