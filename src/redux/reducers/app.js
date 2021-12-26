import AsyncStorage from '@react-native-async-storage/async-storage';
import Immutable from 'seamless-immutable';
import {getCurrentLocale} from '../../i18n';

const saveFirstTime = async value => {
  try {
    await AsyncStorage.setItem('isFirstTime', !value ? new Date().getTime().toString() : '');
  } catch (e) {
    console.log('saveFirstTime error');
  }
};

const INIT_STATE = Immutable({
  isFirstTime: true,
  language: getCurrentLocale(),
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'APP/SET_FIRST_TIME':
      saveFirstTime(action.data);
      return state.set('isFirstTime', action.data);
    case 'APP/SWITCH_LANGUAGE':
      return state.set('language', action.data);
    default:
      return state;
  }
};
