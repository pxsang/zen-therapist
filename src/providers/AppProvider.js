import React, {createContext} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {switchLanguage} from '../redux/actions/app';
import {logout} from '../redux/actions/user';
import t, {setLocale} from '../i18n';

export const AppContext = createContext({});

const AppProvider = ({children}) => {
  const dispatch = useDispatch();
  const AppState = useSelector(state => state.App);

  const {language} = AppState;

  const onSwitchLanguage = lang => {
    setLocale(lang);
    dispatch(switchLanguage(lang));
  };

  const onLogout = () => {
    Alert.alert('Bạn thực sự muốn đăng xuất?', '', [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('logout'),
        onPress: async () => {
          await dispatch(logout());
        },
      },
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        t,
        switchLanguage: onSwitchLanguage,
        logout: onLogout,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
