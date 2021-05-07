import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import GhostButton from '../components/GhostButton';
import Header from '../components/Header';
import OTP from '../components/OTP';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../constants/theme';

import {verifySignup} from '../redux/actions/user';

const VerifyOTP = props => {
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const {phoneNumber, type} = route.params || {};
  let [otp, setOTP] = useState('');

  const handleVerifyOTP = async () => {
    if (type === 'signup') {
      // const result = dispatch(verifySignup(phoneNumber, otp));
      // if (result) {
      //   navigation.navigate('Personal');
      // }
      navigation.navigate('Registered');
    } else if (type === 'forgot_password') {
      navigation.navigate('NewPassword');
    }
  };

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.content}>
              <View>
                <Text style={styles.greeting}>Phone Verification</Text>
                <Text style={styles.title}>Enter your OTP code</Text>
                <Text>{`Enter the 4-digit code sent to you at +84 ${phoneNumber}.`}</Text>
                <View style={styles.formContainer}>
                  <View style={styles.otpContainer}>
                    <OTP
                      autoFocus
                      isNumberInput
                      length={4}
                      onChangeOTP={setOTP}
                    />
                  </View>
                  <View>
                    <GhostButton>
                      <View>
                        <View style={styles.resendContainer}>
                          <Text>Resend Code in </Text>
                          <Text bold>10 seconds</Text>
                        </View>
                      </View>
                    </GhostButton>
                  </View>
                </View>
              </View>
              <View style={styles.footer}>
                <Button
                  icon="arrow-forward-outline"
                  disabled={otp?.length < 4}
                  onPress={handleVerifyOTP}>
                  Continue
                </Button>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    flex: 1,
    paddingVertical: theme.color.l,
    paddingHorizontal: theme.spacing.m,
    justifyContent: 'center',
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
