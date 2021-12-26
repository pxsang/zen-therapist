import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SERVER_BASE_API} from '../../config';

const BASE_API = SERVER_BASE_API;

// let api = axios.create({
//   baseURL: BASE_API.URL,
// });

axios.interceptors.request.use(x => {

  const headers = {
      ...x.headers.common,
      ...x.headers[x.method],
      ...x.headers
  };

  ['common','get', 'post', 'head', 'put', 'patch', 'delete'].forEach(header => {
      delete headers[header]
  })

  const printable = `${new Date()} | Request: ${x.method.toUpperCase()} | ${x.url} | ${ JSON.stringify( x.data) } | ${ JSON.stringify(headers)}`
  console.log(printable)

  return x;
})


axios.interceptors.response.use(x => {

  const printable = `${new Date()} | Response: ${x.status} | ${ JSON.stringify(x.data) }`
  console.log(printable)

  return x;
})

class Api {
  static headers() {
    return new Promise(resolve => {
      AsyncStorage.getItem('@auth_token').then(authToken => {
        resolve({
          Authorization: authToken,
          'Content-Type': 'application/json',
          Locale: 'vi',
        });
      });
    });
  }

  static get(route, params) {
    return this.request(route, params, 'GET');
  }

  static put(route, params) {
    return this.request(route, params, 'PUT');
  }

  static post(route, params) {
    return this.request(route, params, 'POST');
  }

  static delete(route, params) {
    return this.request(route, params, 'DELETE');
  }

  static async request(route, params, verb, extraHeader, disableAuth) {
    const host = BASE_API.URL;
    const url = `${host}${route}`;

    const initialHeaders = await Api.headers();

    let headers = {
      ...initialHeaders,
      ...extraHeader,
    };

    if (disableAuth) {
      delete headers.Authorization;
    }

    const options = {
      headers,
      method: verb,
      params,
      data: params,
    };

    if (verb === 'GET') {
      delete options.data;
    } else {
      delete options.params;
    }

    return axios(url, options)
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        let err;
        if (error.response) {
          err = error.response;
        } else if (error.request) {
          err = error.request;
        } else {
          err = error.message;
        }

        return Promise.reject(err.data);
      });
  }
}
export default Api;
