import React, {useEffect} from 'react';
import _ from 'underscore';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import RideDetailScreen from '../screens/RideDetail';
import ProfileScreen from '../screens/Profile';
import SessionHistoryScreen from '../screens/SessionHistory';
import PaymentHistoryScreen from '../screens/PaymentHistory';
import PersonalScreen from '../screens/Personal';
import UploadDocumentScreen from '../screens/UploadDocument';
import RegisteredScreen from '../screens/Registered';
import NewPasswordScreen from '../screens/NewPassword';
import ChangePasswordScreen from '../screens/ChangePassword';
import MassageOfferedScreen from '../screens/MassageOffered';
import SupportScreen from '../screens/Support';
import SettingsScreen from '../screens/Settings';
import UpdateProfileScreen from '../screens/UpdateProfile';
import RootProvider from '../providers/RootProvider';
import Drawer from '../components/Drawer';

const {Navigator, Screen} = createStackNavigator();

export default () => {
  const navigation = useNavigation();
  const UserState = useSelector(state => state.User);

  useEffect(() => {
    if (!_.isEmpty(UserState.userInfo)) {
      const {
        name,
        identity_card_front,
        identity_card_back,
        massage_certificate_front,
      } = UserState.userInfo;
      if (!name) {
        navigation.navigate('Personal');
      } else if (
        !identity_card_front ||
        !identity_card_back ||
        !massage_certificate_front
      ) {
        navigation.navigate('UploadDocument');
      } else if (UserState.nextAction === 'new_password') {
        navigation.navigate('NewPassword');
      } else if (UserState.nextAction === 'registered') {
        navigation.navigate('Registered');
      }
      //  else {
      //   navigation.navigate('Dashboard');
      // }
    }
  }, [UserState.userInfo, UserState.nextAction, navigation]);

  const getInitialRouteName = () => {
    const {
      name,
      identity_card_front,
      identity_card_back,
      massage_certificate_front,
    } = UserState.userInfo || {};
    if (!name) {
      return 'Personal';
    } else if (
      !identity_card_front ||
      !identity_card_back ||
      !massage_certificate_front
    ) {
      return 'UploadDocument';
    } else {
      return 'Dashboard';
    }
  };

  return (
    <RootProvider>
      <Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Dashboard" component={DrawerNavigation} />
        <Screen name="Personal" component={PersonalScreen} />
        <Screen name="UploadDocument" component={UploadDocumentScreen} />
        <Screen name="UpdateProfile" component={UpdateProfileScreen} />
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="Registered" component={RegisteredScreen} />
        <Screen name="NewPassword" component={NewPasswordScreen} />
        <Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Screen name="RideDetail" component={RideDetailScreen} />
        <Screen name="SessionHistory" component={SessionHistoryScreen} />
        <Screen name="PaymentHistory" component={PaymentHistoryScreen} />
        <Screen name="MassageOffered" component={MassageOfferedScreen} />
        <Screen name="Settings" component={SettingsScreen} />
        <Screen name="Support" component={SupportScreen} />
      </Navigator>
    </RootProvider>
  );
};

const {
  Navigator: DrawerNavigator,
  Screen: DrawerScreen,
} = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <DrawerNavigator
      drawerStyle={{width: 300}}
      drawerContent={props => <Drawer {...props} />}>
      <DrawerScreen name="Home" component={HomeScreen} />
    </DrawerNavigator>
  );
};
