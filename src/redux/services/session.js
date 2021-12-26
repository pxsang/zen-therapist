import Api from '../api/api';
import {API_VERSION, APP_URL} from '../../config';

export default {
  getSession: params => {
    return Api.get(API_VERSION.V1 + APP_URL.SESSION + '/get', params);
  },

  getCustomer: params => {
    return Api.get(API_VERSION.V1 + APP_URL.USER + '/get', params);
  },

  getSessionHistory: params => {
    return Api.get(API_VERSION.V1 + APP_URL.CUSTOMER + APP_URL.SESSION + '/get_all', params);
  },

  accept: params => {
    return Api.post(API_VERSION.V1 + APP_URL.THERAPIST + APP_URL.SESSION + '/accept', params);
  },

  reject: params => {
    return Api.post(API_VERSION.V1 + APP_URL.THERAPIST + APP_URL.SESSION + '/reject', params);
  },

  arrive: params => {
    return Api.post(API_VERSION.V1 + APP_URL.THERAPIST + APP_URL.SESSION + '/arrive', params);
  },

  start: params => {
    return Api.post(API_VERSION.V1 + APP_URL.THERAPIST + APP_URL.SESSION + '/start', params);
  },

  complete: params => {
    return Api.post(API_VERSION.V1 + APP_URL.THERAPIST + APP_URL.SESSION + '/complete', params);
  },

  finish: params => {
    return Api.post(API_VERSION.V1 + APP_URL.THERAPIST + APP_URL.SESSION + '/finish', params);
  },
};
