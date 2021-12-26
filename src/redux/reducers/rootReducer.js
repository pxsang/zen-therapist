import {combineReducers} from 'redux';
import User from './user';
import App from './app';
import Service from './service';
import Session from './session';

export default function getRootReducer() {
  return combineReducers({
    App,
    User,
    Service,
    Session,
  });
}
