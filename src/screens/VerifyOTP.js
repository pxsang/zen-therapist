import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import GhostButton from '../components/GhostButton';
import Header from '../components/Header3';
import OTP from '../components/OTP';
import theme from '../constants/theme';
import t from '../i18n';
import {verifyOTP} from '../redux/actions/user';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const VerifyOTP = props => {
  const dispatch = useDispatch();
  const {route} = props;
  const {phoneNumber, type} = route.params || {};

  let [otp, setOTP] = useState('1111');
  let [isLoading, setLoading] = useState(false);
  let [isFailed, setFailed] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  const handleVerifyOTP = useCallback(async () => {
    try {
      setLoading(true);
      setFailed(false);
      setErrorMessage('');
      await dispatch(verifyOTP(phoneNumber, otp, type));
    } catch (error) {
      setFailed(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, otp, phoneNumber, type]);

  useEffect(() => {
    setTimeout(() => {
      handleVerifyOTP();
    });
  }, [handleVerifyOTP]);

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <KeyboardAwareScrollView>
          <View style={styles.content}>
            <Text style={styles.greeting}>{t('phone_verification')}</Text>
            <Text style={styles.title}>{t('enter_your_otp_code')}</Text>
            <Text>{t('phone_verification_description', {phoneNumber})}</Text>
            <View style={styles.formContainer}>
              <View style={styles.otpContainer}>
                <OTP
                  value={otp}
                  autoFocus
                  isNumberInput
                  length={4}
                  onChangeOTP={setOTP}
                />
                {isFailed && (
                  <View>
                    <View height={10} />
                    <Text color={theme.color.error}>{errorMessage}</Text>
                  </View>
                )}
              </View>
              <View>
                <GhostButton>
                  <View>
                    <View style={styles.resendContainer}>
                      <Text>{t('resend_code_in')} </Text>
                      <Text bold>{t('seconds', {seconds: 10})}</Text>
                    </View>
                  </View>
                </GhostButton>
              </View>
            </View>
            <View style={styles.footer}>
              <Button
                icon="arrow-forward-outline"
                isLoading={isLoading}
                disabled={otp?.length < 4}
                onPress={handleVerifyOTP}>
                {t('continue')}
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    </>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.m,
  },
  content: {
    paddingVertical: theme.color.l,
    paddingHorizontal: theme.spacing.m,
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
  otpContainer: {
    marginVertical: 40,
  },
  resendContainer: {
    flexDirection: 'row',
  },
});
