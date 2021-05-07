const initialState = {
  userInfo: null,
  loggedIn: undefined,
  isMissingData: false,
  nextAction: '',
  login: {
    isLoading: false,
    isFailed: false,
    errorMessage: '',
  },
  logout: {
    isLoading: false,
  },
  signUp: {
    isLoading: false,
    isFailed: false,
    errorMessage: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER/LOGIN_REQUEST':
      return {
        ...state,
        login: {
          ...state.login,
          isFailed: false,
          isLoading: true,
        },
      };
    case 'USER/LOGIN_SUCCESS':
      return {
        ...state,
        loggedIn: true,
        login: {
          ...state.login,
          isFailed: false,
          isLoading: false,
        },
        userInfo: action.data,
      };
    case 'USER/LOGIN_FAIL':
      return {
        ...state,
        loggedIn: false,
        login: {
          ...state.login,
          isFailed: true,
          errorMessage: action.data,
          isLoading: false,
        },
      };
    case 'USER/SIGNUP_REQUEST':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: false,
          isLoading: true,
        },
      };
    case 'USER/SIGNUP_SUCCESS':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: false,
          isLoading: false,
        },
        userInfo: action.data,
      };
    case 'USER/SIGNUP_FAIL':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: true,
          errorMessage: action.data,
          isLoading: false,
        },
      };
    case 'USER/COMPLETE_PROFILE_REQUEST':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: false,
          isLoading: true,
        },
      };
    case 'USER/COMPLETE_PROFILE_SUCCESS':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: false,
          isLoading: false,
        },
        userInfo: action.data,
        isMissingData: false,
      };
    case 'USER/COMPLETE_PROFILE_FAIL':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: true,
          errorMessage: action.data,
          isLoading: false,
        },
      };
    case 'USER/LOGOUT_REQUEST':
      return {
        ...state,
        logout: {
          ...state.logout,
          isLoading: true,
        },
      };
    case 'USER/LOGOUT_SUCCESS':
      return {
        ...state,
        logout: {
          ...state.logout,
          isLoading: false,
        },
        loggedIn: false,
        userInfo: null,
      };
    case 'USER/VERIFY_SIGNUP_REQUEST':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: false,
          isLoading: true,
        },
      };
    case 'USER/VERIFY_SIGNUP_SUCCESS':
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isFailed: false,
          isLoading: false,
        },
        userInfo: action.data,
        loggedIn: true,
        isMissingData: !action.data.firstName || !action.data.lastName,
        nextAction: 'completed_profile',
      };
    default:
      return state;
  }
};
