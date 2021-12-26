import React, {createContext} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useNavigation, useRoute, useNavigationState} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Text from '../components/Text';
import {switchLanguage} from '../redux/actions/app';
import {logout} from '../redux/actions/user';
import t, {setLocale} from '../i18n';

export const RootContext = createContext({});

const RootProvider = ({children}) => {
  const navigation = useNavigation();
  // const route = useRoute();
  const dispatch = useDispatch();
  const AppState = useSelector(state => state.App);
  const state = useNavigationState(state => state);
  // console.log('navigation', JSON.stringify(navigation));
  // console.log('state', JSON.stringify(state));


  // const isRoot = route.name === 'Root';
  // const isHome = route.name === 'Root' && route.state?.routes[0]?.name === 'Dashboard';
  // const isHome = route?.name === 'Root' && route?.state?.routes[0]?.state?.index === 0;

  // const routeName = route.name;

  return (
    <RootContext.Provider
      value={{
      }}>
      <View style={{ flex: 1 }}>
        {children}
        {/* {!isHome &&
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0.
          }}>
            <Text>Cris Sang</Text>
          </View>
        } */}
      </View>
    </RootContext.Provider>
  );
};

export default RootProvider;
