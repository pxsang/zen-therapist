import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignUpScreen from '../screens/SignUp';
import WelcomeScreen from '../screens/Welcome';
import VerifyOTPScreen from '../screens/VerifyOTP';
import PhoneLoginScreen from '../screens/PhoneLogin';
import PersonalScreen from '../screens/Personal';
import RegisteredScreen from '../screens/Registered';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import NewPasswordScreen from '../screens/NewPassword';
import TermsScreen from '../screens/Terms';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <Navigator
    initialRouteName="Welcome"
    screenOptions={{
      headerShown: false,
    }}>
    <Screen name="Welcome" component={WelcomeScreen} />
    <Screen name="PhoneLogin" component={PhoneLoginScreen} />
    <Screen name="VerifyOTP" component={VerifyOTPScreen} />
    <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Screen name="SignUp" component={SignUpScreen} />
    <Screen name="Terms" component={TermsScreen} />
    <Screen name="Personal" component={PersonalScreen} />
    <Screen name="Registered" component={RegisteredScreen} />
    <Screen name="NewPassword" component={NewPasswordScreen} />
  </Navigator>
);
