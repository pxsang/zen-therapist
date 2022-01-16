import React, {useState, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Layout, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import Image from '../components/Image';
import GhostButton from '../components/GhostButton';
import Input from '../components/Input';
import theme from '../constants/theme';
import Header from '../components/Header3';
import t from '../i18n';
import {forgotPassword} from '../redux/actions/user';
import {phoneValidator, convertTo0PhoneNumber} from '../helpers/display';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  let [phoneNumber, setPhoneNumber] = useState('');
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

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');
      await dispatch(
        forgotPassword(convertTo0PhoneNumber(`+84${phoneNumber}`)),
      );

      navigation.navigate('VerifyOTP', {
        type: 'forgot_password',
        phoneNumber: convertTo0PhoneNumber(`+84${phoneNumber}`),
      });
    } catch (error) {
      console.log(error);
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderError = () => {
    if (!isFailed) return null;

    return (
      <View>
        <View height={5} />
        <View style={theme.block.rowMiddle}>
          <Icon
            style={styles.errorIcon}
            fill={theme.color.error}
            name="alert-triangle-outline"
          />
          <View width={10} />
          <Text color={theme.color.error}>{errorMessage}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            <Text style={styles.greeting}>{t('forgot_password')}</Text>
            <Text style={styles.title}>{t('dont_worry')}</Text>
            <View style={styles.formContainer}>
              <Input
                keyboardType="phone-pad"
                value={phoneNumber}
                label={t('phone_number')}
                placeholder={t('enter_your_phone_number')}
                status={isFailed ? 'danger' : 'basic'}
                caption={renderError()}
                accessoryLeft={renderCountryCode}
                accessoryRight={renderCheckMarkIcon}
                onChangeText={nextValue => setPhoneNumber(nextValue)}
              />
              <View style={styles.buttonContainer}>
                <GhostButton onPress={() => navigation.navigate('PhoneLogin')}>
                  <View>
                    <View style={styles.row}>
                      <Text>{t('no_problem')}</Text>
                      <View width={5} />
                      <Text bold>{t('sign_in')}</Text>
                    </View>
                  </View>
                </GhostButton>
              </View>
            </View>
            <View style={styles.footer}>
              <Button
                isLoading={isLoading}
                icon="arrow-forward-outline"
                disabled={!phoneValidator(phoneNumber)}
                onPress={handleForgotPassword}>
                {t('continue')}
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    </>
  );
};

export default ForgotPassword;

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
  buttonContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  errorIcon: {
    width: 24,
    height: 24,
  },
});
