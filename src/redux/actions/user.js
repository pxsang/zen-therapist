import UserService from '../services/user';

export const signup = phoneNumber => {
  return dispatch => {
    dispatch({type: 'USER/SIGNUP_REQUEST'});
    return UserService.signup({phoneNumber})
      .then(response => {
        console.log('response', response);
        dispatch({
          type: 'USER/SIGNUP_SUCCESS',
        });
        return true;
      })
      .catch(error => {
        console.log('signup error', error);
        dispatch({
          type: 'USER/SIGNUP_FAIL',
          data: error.error_message,
        });
        return false;
      });
  };
};

export const verifySignup = (phoneNumber, otp) => {
  return dispatch => {
    dispatch({type: 'USER/VERIFY_SIGNUP_REQUEST'});
    return UserService.verifySignup({phoneNumber, otp})
      .then(response => {
        console.log('verifySignup', response);
        dispatch({
          type: 'USER/VERIFY_SIGNUP_SUCCESS',
          data: response,
        });
        return true;
      })
      .catch(error => {
        dispatch({
          type: 'USER/VERIFY_SIGNUP_FAIL',
          data: error.error_message,
        });
        return false;
      });
  };
};

export const completeProfile = formData => {
  return dispatch => {
    dispatch({type: 'USER/COMPLETE_PROFILE_REQUEST'});
    return UserService.completeProfile(formData)
      .then(response => {
        console.log('completeProfile response', response);
        dispatch({
          type: 'USER/COMPLETE_PROFILE_SUCCESS',
          data: response,
        });

        return true;
      })
      .catch(error => {
        console.log('completeProfile error', error);
        dispatch({
          type: 'USER/COMPLETE_PROFILE_FAIL',
          data: error.error_message,
        });

        return false;
      });
  };
};

export const login = (phoneNumber, password) => {
  return dispatch => {
    dispatch({type: 'USER/LOGIN_REQUEST'});
    UserService.login({phoneNumber, password})
      .then(response => {
        console.log('response', response);
        dispatch({
          type: 'USER/LOGIN_SUCCESS',
          data: response,
        });
      })
      .catch(error => {
        console.log('error', error);
        dispatch({
          type: 'USER/LOGIN_FAIL',
          data: error,
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({type: 'USER/LOGOUT_REQUEST'});
    UserService.logout().then(() => {
      dispatch({type: 'USER/LOGOUT_SUCCESS'});
    });
  };
};
