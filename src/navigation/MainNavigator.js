import React, {useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';

import HomeScreen from '../screens/Home';
import RideDetailScreen from '../screens/RideDetail';
import ProfileScreen from '../screens/Profile';
import SessionHistoryScreen from '../screens/SessionHistory';
import PaymentHistoryScreen from '../screens/PaymentHistory';
import PersonalScreen from '../screens/Personal';
import RegisteredScreen from '../screens/Registered';
import NewPasswordScreen from '../screens/NewPassword';
import MassageOfferedScreen from '../screens/MassageOffered';
import SupportScreen from '../screens/Support';

import Drawer from '../components/Drawer';
import Header from '../components/Header';
import Text from '../components/Text';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.User);
  let [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    if (User.isMissingData) {
      setInitialRouteName('Personal');
    } else if (User.nextAction === 'new_password') {
      setInitialRouteName('NewPassword');
    } else {
      setInitialRouteName('Root');
    }
  }, [User.isMissingData, User.nextAction]);

  const getInitialRouteName = () => {
    if (User.isMissingData) {
      return 'Personal';
    } else if (User.nextAction === 'new_password') {
      return setInitialRouteName('NewPassword');
    } else {
      return 'Root';
    }
  };

  return (
    <Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Root" component={DrawerNavigation} />
      <Screen name="Personal" component={PersonalScreen} />
      <Screen name="Registered" component={RegisteredScreen} />
      <Screen name="NewPassword" component={NewPasswordScreen} />
      <Screen name="RideDetail" component={RideDetailScreen} />
    </Navigator>
  );
};

const {
  Navigator: DrawerNavigator,
  Screen: DrawerScreen,
} = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <DrawerNavigator
      drawerStyle={{ width: 330 }}
      drawerContent={props => <Drawer {...props} />}>
      <DrawerScreen name="Home" component={HomeScreen} />
      <DrawerScreen name="Profile" component={ProfileScreen} />
      <DrawerScreen name="SessionHistory" component={SessionHistoryScreen} />
      <DrawerScreen name="PaymentHistory" component={PaymentHistoryScreen} />
      <DrawerScreen name="MassageOffered" component={MassageOfferedScreen} />
      <DrawerScreen name="Settings" component={ComingSoon} />
      <DrawerScreen name="Support" component={SupportScreen} />
    </DrawerNavigator>
  );
};

const ComingSoon = (props) => {
  return (
    <>
      <Header {...props} />
      <Layout style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
      }}>
        <Text bold size={24}>Coming Soon</Text>
      </Layout>
    </>
  );
};
