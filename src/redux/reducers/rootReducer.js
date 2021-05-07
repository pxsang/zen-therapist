import {combineReducers} from 'redux';
import User from './user';
import App from './app';

export default function getRootReducer() {
  return combineReducers({
    App,
    User,
  });
}
