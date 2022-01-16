import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';

import Header from '../components/Header3';
import Text from '../components/Text';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import Input from '../components/Input';
import Image from '../components/Image';
import theme from '../constants/theme';
import {loginWithPassword} from '../redux/actions/user';
import t from '../i18n';
import {phoneValidator, convertTo0PhoneNumber} from '../helpers/display';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PhoneLogin = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  let [phoneNumber, setPhoneNumber] = useState('');
  let [password, setPassword] = useState('');

  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  const zoomIconRef = useRef();

  const renderCheckMarkIcon = iconProps => (
    <Icon
      {...iconProps}
      ref={zoomIconRef}
      animation="zoom"
      name="checkmark-circle-2"
      fill={
        phoneValidator(phoneNumber) ? theme.color.primary : theme.color.gray
      }
    />
  );

  const renderCountryCode = () => (
    <View style={styles.countryCodeContainer}>
      <Image
        style={styles.countryCodeIcon}
        source={require('../assets/icons/vietnam.png')}
      />
      <Text style={styles.countryCode}>+84</Text>
    </View>
  );

  const handlePhoneLogin = async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');
      const result = await dispatch(
        loginWithPassword(convertTo0PhoneNumber(`+84${phoneNumber}`), password),
      );
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderError = () => {
    if (!isFailed) return null;

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
        <Icon
          style={{
            width: 24,
            height: 24,
            marginRight: 10,
          }}
          fill={theme.color.error}
          name="alert-triangle-outline"
        />
        <Text color={theme.color.error}>{errorMessage}</Text>
      </View>
    );
  };

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            <Text style={styles.title}>{t('login__greeting')}</Text>
            <View style={styles.formContainer}>
              <Input
                keyboardType="phone-pad"
                value={phoneNumber}
                label={t('phone_number')}
                placeholder={t('enter_your_phone_number')}
                accessoryLeft={renderCountryCode}
                accessoryRight={renderCheckMarkIcon}
                onChangeText={nextValue => setPhoneNumber(nextValue)}
              />
              <View style={theme.block.marginTop(20)}>
                <Input
                  value={password}
                  label={t('password')}
                  status={isFailed ? 'danger' : 'basic'}
                  caption={renderError()}
                  placeholder={t('enter_your_password')}
                  onChangeText={nextValue => setPassword(nextValue)}
                  secureTextEntry
                />
              </View>
              <View style={theme.block.marginTop(20)}>
                <GhostButton
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  {t('forgot_password')}
                </GhostButton>
              </View>
            </View>
            <View style={styles.footer}>
              <Button
                isLoading={isLoading}
                disabled={!phoneValidator(phoneNumber)}
                icon="arrow-forward-outline"
                onPress={handlePhoneLogin}>
                {t('login')}
              </Button>
              <View style={theme.block.marginTop(20)}>
                <GhostButton onPress={() => navigation.navigate('SignUp')}>
                  {t('or_create_my_account')}
                </GhostButton>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    </>
  );
};

export default PhoneLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  footer: {
    justifyContent: 'flex-end',
  },
  formContainer: {
    paddingVertical: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  countryCodeIcon: {
    width: 24,
    height: 16,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  countryCode: {
    marginLeft: 5,
    fontSize: 18,
    color: theme.color.primary,
  },
});
