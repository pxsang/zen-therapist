import Api from '../api/api';
import {APP_URL} from '../../config';

let USERS = [
  {
    id: 1,
    firstName: 'Master',
    lastName: 'Yi',
    authToken: 'masteryi',
    phoneNumber: '911111111',
    password: '111111',
    otp: '1111',
  },
  {
    id: 2,
    firstName: 'Dr.',
    lastName: 'Mundo',
    authToken: 'drmundo',
    phoneNumber: '922222222',
    password: '222222',
    otp: '2222',
  },
  {
    id: 3,
    firstName: 'Jarvan',
    lastName: 'IV',
    authToken: 'jarvaniv',
    phoneNumber: '933333333',
    password: '333333',
    otp: '3333',
  },
  {
    id: 4,
    firstName: 'Lee',
    lastName: 'Sin',
    authToken: 'leesin',
    phoneNumber: '944444444',
    password: '444444',
    otp: '4444',
  },
];

export default {
  signup: params => {
    return new Promise((resolve, reject) => {
      const {phoneNumber} = params;
      const user = USERS.find(_ => _.phoneNumber === phoneNumber);
      if (user) {
        reject({
          error_message: 'Phone number existed',
        });
      } else {
        const highestId = Math.max(...USERS.map(_ => _.id));
        const newUser = {
          id: highestId + 1,
          firstName: '',
          lastName: '',
          phoneNumber,
          password: '',
          otp: '0000',
          authToken: '',
        };
        USERS.push(newUser);
        resolve(newUser);
      }
    });
  },
  verifySignup: params => {
    return new Promise((resolve, reject) => {
      const {phoneNumber, otp} = params;
      const user = USERS.find(_ => _.phoneNumber === phoneNumber && _.otp === otp);
      const index = USERS.findIndex(_ => _.phoneNumber === phoneNumber && _.otp === otp);
      if (index !== -1) {
        const updatedUser = {
          ...USERS[index],
          authToken: `newUser${user.id}`,
        };

        USERS[index] = updatedUser;

        resolve(updatedUser);
      } else {
        reject({error_message: 'Invalid OTP'});
      }
    });
  },
  completeProfile: params => {
    console.log('completeProfile params', params);
    return new Promise((resolve, reject) => {
      const {id, firstName, lastName, password} = params;
      const index = USERS.findIndex(_ => _.id === id);
      if (index !== -1) {
        const updatedUser = {
          ...USERS[index],
          firstName,
          lastName,
          password,
        };

        USERS[index] = updatedUser;

        resolve(updatedUser);
      } else {
        reject({error_message: 'Error'});
      }
    });
  },
  verifyForgotPassword: params => {
    return new Promise((resolve, reject) => {
      const {phoneNumber, otp} = params;
      if (phoneNumber === '922222222' && otp === '222222') {
        resolve({
          id: 3,
          firstName: 'Cris',
          lastName: 'Thu 2',
          authToken: 'xinzhao123masteryi',
        });
      } else {
        reject({error_message: 'Invalid OTP'});
      }
    });
  },
  verifyOTP: params => {
    return new Promise((resolve, reject) => {
      const {phoneNumber, otp} = params;
      if (phoneNumber === '922222222' && otp === '222222') {
        resolve({
          id: 3,
          firstName: 'Cris',
          lastName: 'Thu 2',
          authToken: 'xinzhao123masteryi',
        });
      } else {
        reject({error_message: 'Invalid OTP'});
      }
    });
  },
  login: params => {
    return new Promise((resolve, reject) => {
      const {phoneNumber, password} = params;
      const user = USERS.find(_ => _.phoneNumber === phoneNumber);

      if (user) {
        if (user.password === password) {
          resolve(user);
        } else {
          reject({
            error_message: 'Password is wrong',
          });
        }
      } else {
        reject({
          error_message: 'Phone number not exist',
        });
      }
    });
    // return Api.post(APP_URL.USER, params).then(res => res.data);
  },

  logout: () => {
    return new Promise.resolve(true);
    // return Api.post(APP_URL.USER, params).then(res => res.data);
  },
};
