import Immutable from 'seamless-immutable';
import {SESSION_STATUS} from '../../constants/Constants';

const INIT_STATE = Immutable({
  detail: null,
  history: {
    isLoading: false,
    data: [],
  },
  historyDetail: {
    isLoading: false,
    data: null,
  },
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SESSION/GET_SESSION_SUCCESS':
      return state.set('detail', action.data);
    case 'SESSION/CLEAN':
      return state.set('detail', null);
    // case 'SESSION/COMPLETED':
    //   return state.set('detail', {...state.detail, ...action.data});
    case 'SESSION/COMPLETED':
      return state.set('detail', {...state.detail, status: SESSION_STATUS.COMPLETED, last_updated_at: new Date().getTime()});
    case 'SESSION/CANCELLED':
      return state.set('detail', {...state.detail, status: SESSION_STATUS.CANCELED, last_updated_at: new Date().getTime()});
    case 'SESSION/GET_HISTORY_REQUEST':
      return state.setIn(['history', 'isLoading'], true);
    case 'SESSION/GET_HISTORY_SUCCESS':
      return state
        .setIn(['history', 'isLoading'], false)
        .setIn(['history', 'data'], action.data);
    case 'SESSION/GET_HISTORY_DETAIL_REQUEST':
      return state
        .setIn(['historyDetail', 'isLoading'], true)
        .setIn(['historyDetail', 'data'], null);
    case 'SESSION/GET_HISTORY_DETAIL_SUCCESS':
      return state
        .setIn(['historyDetail', 'isLoading'], false)
        .setIn(['historyDetail', 'data'], action.data);
    default:
      return state;
  }
};
