import React, {useState, useRef} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {Layout, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import GhostButton from '../components/GhostButton';
import Input from '../components/Input';
import theme from '../constants/theme';
import Header from '../components/Header';

const ForgotPassword = props => {
  const {navigation} = props;
  let [phoneNumber, setPhoneNumber] = useState('');

  const zoomIconRef = useRef();

  const renderCheckMarkIcon = iconProps => (
    <Icon
      {...iconProps}
      ref={zoomIconRef}
      animation="zoom"
      name="checkmark-circle-2"
      fill={phoneNumber?.length === 9 ? theme.color.primary : theme.color.gray}
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

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={[styles.container]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View>
                <Text style={styles.greeting}>Forgot Password?!</Text>
                <Text style={styles.title}>Don’t worry!</Text>
                <View style={styles.formContainer}>
                  <Input
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    label="Phone number"
                    placeholder="Enter your phone number"
                    accessoryLeft={renderCountryCode}
                    accessoryRight={renderCheckMarkIcon}
                    onChangeText={nextValue => setPhoneNumber(nextValue)}
                  />
                  <View style={styles.buttonContainer}>
                    <GhostButton
                      onPress={() => navigation.navigate('PhoneLogin')}>
                      <View>
                        <View style={styles.row}>
                          <Text>No problem? </Text>
                          <Text bold>Sign In</Text>
                        </View>
                      </View>
                    </GhostButton>
                  </View>
                </View>
              </View>
              <View style={styles.footer}>
                <Button
                  icon="arrow-forward-outline"
                  disabled={phoneNumber?.length < 9}
                  onPress={() =>
                    navigation.navigate('VerifyOTP', {
                      phoneNumber,
                      type: 'forgot_password',
                    })
                  }>
                  Continue
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    flex: 1,
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
});
