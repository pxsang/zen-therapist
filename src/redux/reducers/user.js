import Immutable from 'seamless-immutable';

const INIT_STATE = Immutable({
  userInfo: null,
  loggedIn: undefined,
  sessionStarted: false,
  nextAction: '',
  login: {
    isLoading: false,
    isSuccessful: false,
    isFailed: false,
    errorMessage: '',
  },
  logout: {
    isLoading: false,
  },
  signup: {
    isLoading: false,
    isSuccessful: false,
    isFailed: false,
    errorMessage: '',
  },
  forgotPassword: {
    isLoading: false,
    isSuccessful: false,
    isFailed: false,
    errorMessage: '',
  },
  updatePassword: {
    isLoading: false,
    isSuccessful: false,
    isFailed: false,
    errorMessage: '',
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'USER/GET_PROFILE_SUCCESS':
      return state.set('sessionStarted', true).set('userInfo', {
        ...action.data,
        avatar: '',
      });
    case 'USER/GET_PROFILE_FAILED':
      return state
        .set('sessionStarted', false)
        .set('loggedIn', false)
        .set('userInfo', null);
    case 'USER/UPDATE_PROFILE_SUCCESS':
      return state.set('userInfo', {
        ...action.data,
      });
    case 'USER/LOGIN_REQUEST':
      return state
        .setIn(['login', 'isLoading'], true)
        .setIn(['login', 'isSuccessful'], false)
        .setIn(['login', 'isFailed'], false);
    case 'USER/LOGIN_SUCCESS':
      return state
        .set('loggedIn', true)
        .setIn(['login', 'isLoading'], false)
        .setIn(['login', 'isSuccessful'], true)
        .setIn(['login', 'isFailed'], false)
        .set(
          'nextAction',
          action.data === 'signup'
            ? 'registered'
            : action.data === 'forgot_password'
            ? 'new_password'
            : '',
        );
    case 'USER/LOGIN_FAILED':
      return state
        .set('loggedIn', false)
        .setIn(['login', 'isLoading'], false)
        .setIn(['login', 'isSuccessful'], false)
        .setIn(['login', 'isFailed'], true)
        .setIn(['login', 'errorMessage'], action.data);
    case 'USER/SIGNUP_REQUEST':
      return state
        .setIn(['signup', 'isLoading'], true)
        .setIn(['signup', 'isSuccessful'], false)
        .setIn(['signup', 'isFailed'], false);
    case 'USER/SIGNUP_SUCCESS':
      return state
        .setIn(['signup', 'isLoading'], false)
        .setIn(['signup', 'isSuccessful'], true)
        .setIn(['signup', 'isFailed'], false);
    case 'USER/SIGNUP_FAILED':
      return state
        .setIn(['signup', 'isLoading'], false)
        .setIn(['signup', 'isSuccessful'], false)
        .setIn(['signup', 'isFailed'], true)
        .setIn(['signup', 'errorMessage'], action.data);
    case 'USER/FORGOT_PASSWORD_REQUEST':
      return state
        .setIn(['forgotPassword', 'isLoading'], true)
        .setIn(['forgotPassword', 'isSuccessful'], false)
        .setIn(['forgotPassword', 'isFailed'], false);
    case 'USER/FORGOT_PASSWORD_SUCCESS':
      return state
        .setIn(['forgotPassword', 'isLoading'], false)
        .setIn(['forgotPassword', 'isSuccessful'], true)
        .setIn(['forgotPassword', 'isFailed'], false);
    case 'USER/FORGOT_PASSWORD_FAILED':
      return state
        .setIn(['forgotPassword', 'isLoading'], false)
        .setIn(['forgotPassword', 'isSuccessful'], false)
        .setIn(['forgotPassword', 'isFailed'], true)
        .setIn(['forgotPassword', 'errorMessage'], action.data);
    case 'USER/UPDATE_PASSWORD_REQUEST':
      return state
        .setIn(['updatePassword', 'isLoading'], true)
        .setIn(['updatePassword', 'isSuccessful'], false)
        .setIn(['updatePassword', 'isFailed'], false);
    case 'USER/UPDATE_PASSWORD_SUCCESS':
      return state
        .setIn(['updatePassword', 'isLoading'], false)
        .setIn(['updatePassword', 'isSuccessful'], true)
        .setIn(['updatePassword', 'isFailed'], false)
        .set('nextAction', '');
    case 'USER/UPDATE_PASSWORD_FAILED':
      return state
        .setIn(['updatePassword', 'isLoading'], false)
        .setIn(['updatePassword', 'isSuccessful'], false)
        .setIn(['updatePassword', 'isFailed'], true)
        .setIn(['updatePassword', 'errorMessage'], action.data);
    case 'USER/LOGOUT_REQUEST':
      return state.setIn(['logout', 'isLoading'], true);
    case 'USER/LOGOUT_SUCCESS':
      return state
        .set('loggedIn', false)
        .set('sessionStarted', false)
        .setIn(['logout', 'isLoading'], false);
    case 'USER/REGISTERED':
      return state.set('nextAction', '');
    default:
      return state;
  }
};
