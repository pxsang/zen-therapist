import Api from '../api/api';
import {API_VERSION, APP_URL} from '../../config';

export default {
  getServices: params => {
    return Api.get(API_VERSION.V1 + APP_URL.CUSTOMER + '/get_services', params);
  },
};
