import React, {useState, useRef} from 'react';
import {StyleSheet, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Layout, Icon} from '@ui-kitten/components';
import Button from '../components/Button';
import Text from '../components/Text';
import GhostButton from '../components/GhostButton';
import Input from '../components/Input';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../constants/theme';

import {signup} from '../redux/actions/user';

const SignUp = props => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.User);
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

  const handleSignup = async () => {
    // const result = await dispatch(signup(phoneNumber));
    // if (result) {
    //   navigation.navigate('VerifyOTP', {type: 'signup', phoneNumber});
    // }
    navigation.navigate('VerifyOTP', {type: 'signup', phoneNumber});
  };

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}
          style={[styles.container]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
              <View>
                <Text style={styles.greeting}>Hello, nice to meet you!</Text>
                <Text style={styles.title}>Join our top-notch therapists!</Text>
                <View style={styles.formContainer}>
                  <Input
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    label="Phone number"
                    placeholder="Enter your phone number"
                    caption={User.signUp.isFailed ? User.signUp.errorMessage : ''}
                    accessoryLeft={renderCountryCode}
                    accessoryRight={renderCheckMarkIcon}
                    onChangeText={nextValue => setPhoneNumber(nextValue)}
                  />
                  <View style={{ marginTop: 20 }}>
                    <GhostButton>
                      <View>
                        <Text>By creating an account, you agree to our</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text bold>Terms of Service</Text>
                          <Text> and </Text>
                          <Text bold>Privacy Policy</Text>
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
                  onPress={handleSignup}>
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
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
});
