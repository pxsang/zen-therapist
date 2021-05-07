import React, {useState, useRef} from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Layout, Text, Icon} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../components/Header';
import Button from '../components/Button';
import GhostButton from '../components/GhostButton';
import Input from '../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../constants/theme';

import {login} from '../redux/actions/user';

const PhoneLogin = props => {
  const dispatch = useDispatch();
  const App = useSelector(state => state.App);
  const {navigation} = props;
  let [phoneNumber, setPhoneNumber] = useState('');
  let [password, setPassword] = useState('');

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

  const handlePhoneLogin = () => {
    // dispatch(login(phoneNumber, password));
    navigation.navigate('Root');
  };

  return (
    <>
      <Header {...props} />
      <Layout style={[styles.container]}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Welcome back!</Text>
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
                <View style={theme.block.marginTop(20)}>
                  <Input
                    value={password}
                    label="Password"
                    placeholder="Enter your password"
                    onChangeText={nextValue => setPassword(nextValue)}
                    secureTextEntry
                  />
                </View>
                <View style={theme.block.marginTop(20)}>
                  <GhostButton
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    Forgot password?
                  </GhostButton>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Button
                isLoading={App.login.isLoading}
                // disabled={phoneNumber?.length !== 9}
                icon="arrow-forward-outline"
                onPress={handlePhoneLogin}>
                Login
              </Button>
              <View style={theme.block.marginTop(20)}>
                <GhostButton onPress={() => navigation.navigate('SignUp')}>
                  Or Create My Account
                </GhostButton>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
