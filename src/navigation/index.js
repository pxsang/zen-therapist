import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/Splash';
import {setFirstTime} from '../redux/actions/app';

export default () => {
  const dispatch = useDispatch();
  const App = useSelector(state => state.App);
  const User = useSelector(state => state.User);
  let [loaded, setLoaded] = useState(false);
  // let [loggedIn, setLoggedIn] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        const isFirstTimeValue = await AsyncStorage.getItem('isFirstTime');
        if (!isFirstTimeValue) {
          dispatch(setFirstTime(true));
        } else {
          dispatch(setFirstTime(false));
        }
        setLoaded(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <RootNavigator isFirstTime={App.isFirstTime} loggedIn={User.loggedIn} />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

const RootNavigator = ({isFirstTime, loggedIn}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {/* {isFirstTime ? ( */}
      <Stack.Screen name="Splash" component={SplashScreen} />
    {/* ) : !loggedIn ? ( */}
      <Stack.Screen name="Auth" component={AuthNavigator} />
    {/* ) : ( */}
      <Stack.Screen name="Root" component={MainNavigator} />
    {/* )} */}
  </Stack.Navigator>
);
