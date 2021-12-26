import Api from '../api/api';
import {API_VERSION, APP_URL} from '../../config';

export default {
  getProfile: params => {
    return Api.get(API_VERSION.V1 + APP_URL.USER + '/profile', params);
  },

  login: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/login', params);
  },

  register: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/register', params);
  },

  verifyOTP: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/verify_otp', params);
  },

  updateProfile: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/update_profile', params);
  },

  logout: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/logout', params);
  },

  loginWithPassword: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/login_with_password', params);
  },

  forgotPassword: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/login', params);
  },

  setPassword: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/set_password', params);
  },

  startSession: params => {
    return Api.post(API_VERSION.V1 + APP_URL.USER + '/start_session', params);
  },
};
