import axios from 'axios';

import {SERVER_BASE_API} from '../../config';

const BASE_API = SERVER_BASE_API;

// let api = axios.create({
//   baseURL: BASE_API.URL,
// });

class Api {
  static headers(KEY) {
    return {
      Authorization: KEY,
      'Content-Type': 'application/json',
    };
  }

  static get(route, key = null) {
    return this.request(route, null, 'GET', key);
  }

  static put(route, params, key = null) {
    return this.request(route, params, 'PUT', key);
  }

  static post(route, params, key = null) {
    return this.request(route, params, 'POST', key);
  }

  static delete(route, params, key = null) {
    return this.request(route, params, 'DELETE', key);
  }

  static request(route, params, verb, key) {
    const host = BASE_API.URL;
    const url = `${host}${route}`;
    const options = {
      method: verb,
      data: params,
    };

    if (key !== null) {
      options.headers = Api.headers(key);
    }

    return axios(url, options);
  }
}
export default Api;
