import AsyncStorage from '@react-native-async-storage/async-storage';

const saveFirstTime = async value => {
  try {
    await AsyncStorage.setItem('isFirstTime', !value ? new Date().getTime().toString() : '');
  } catch (e) {
    console.log('saveFirstTime error');
  }
};

const INIT_STATE = {
  isFirstTime: true,
  isLoggedIn: undefined,
  login: {
    isLoading: false,
    isFailed: false,
    errorMessage: '',
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'APP/SET_FIRST_TIME':
      saveFirstTime(action.data);
      return {
        ...state,
        isFirstTime: action.data,
      };
    case 'APP/LOGIN_REQUEST':
      return {
        ...state,
        login: {
          ...state.login,
          isLoading: true,
        },
      };
    default:
      return state;
  }
};
