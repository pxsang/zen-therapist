import moment from 'moment';
import SessionService from '../services/session';
import {SESSION_STATUS} from '../../constants/Constants';

export const getSession = ({assign_session, last_updated_at, customer_id}) => {
  return dispatch => {
    return Promise.all([
      SessionService.getSession({session_id: assign_session}),
      SessionService.getCustomer({user_code: customer_id}),
    ]).then(([sessionData, customerData]) => {
      if (sessionData && customerData) {
        let started_at =
          sessionData.status === SESSION_STATUS.STARTED
            ? new Date().getTime()
            : null;

        dispatch({
          type: 'SESSION/GET_SESSION_SUCCESS',
          data: {
            ...sessionData,
            customer: {...customerData},
            last_updated_at,
            started_at,
          },
        });
      }
    });
  };
};

export const getSessionDetail = sessionId => {
  return dispatch => {
    dispatch({type: 'SESSION/GET_HISTORY_DETAIL_REQUEST'});
    SessionService.getSession({
      session_id: sessionId,
    }).then(response => {
      if (response) {
        dispatch({type: 'SESSION/GET_HISTORY_DETAIL_SUCCESS', data: response});
      }
    });
  };
};

export const getSessionHistory = () => {
  return dispatch => {
    dispatch({type: 'SESSION/GET_HISTORY_REQUEST'});
    SessionService.getSessionHistory({
      status: ['finished', 'completed'],
      page: 1,
      per_page: 100,
    }).then(response => {
      if (response && response.data) {
        dispatch({type: 'SESSION/GET_HISTORY_SUCCESS', data: response.data});
      }
    });
  };
};

export const getTodayHistory = () => {
  return dispatch => {
    dispatch({type: 'SESSION/GET_HISTORY_REQUEST'});
    SessionService.getSessionHistory({
      status: ['finished', 'completed'],
      page: 1,
      per_page: 100,
      from: new Date(moment().startOf('date')).getTime(),
      to: new Date(moment().endOf('date')).getTime(),
    }).then(response => {
      if (response && response.data) {
        dispatch({type: 'SESSION/GET_HISTORY_SUCCESS', data: response.data});
      }
    });
  };
};

export const getWeeklyHistory = () => {
  return dispatch => {
    dispatch({type: 'SESSION/GET_HISTORY_REQUEST'});
    SessionService.getSessionHistory({
      status: ['finished', 'completed'],
      page: 1,
      per_page: 100,
      from: new Date(moment().startOf('week')).getTime(),
      to: new Date(moment().endOf('week')).getTime(),
    }).then(response => {
      if (response && response.data) {
        dispatch({type: 'SESSION/GET_HISTORY_SUCCESS', data: response.data});
      }
    });
  };
};

export const accept = sessionId => {
  return () => {
    return SessionService.accept({session_id: sessionId});
  };
};

export const reject = sessionId => {
  return () => {
    return SessionService.reject({session_id: sessionId});
  };
};

export const arrive = sessionId => {
  return () => {
    return SessionService.arrive({session_id: sessionId});
  };
};

export const start = sessionId => {
  return () => {
    return SessionService.start({session_id: sessionId});
  };
};

// export const complete = sessionId => {
//   return dispatch => {
//     return SessionService.complete({session_id: sessionId}).then(response => {
//       dispatch({type: 'SESSION/COMPLETED', data: response});
//     });
//   };
// };
export const completed = () => {
  return dispatch => {
    dispatch({type: 'SESSION/COMPLETED'});
  };
};

export const completedAndRating = (sessionId, rating) => {
  return dispatch => {
    return SessionService.complete({
      session_id: sessionId,
      rating: rating || 0,
      comment: '',
    }).then(() => {
      dispatch({type: 'SESSION/COMPLETED'});
    });
  };
};

export const cancelled = () => {
  console.log('cancelled');
  return dispatch => {
    dispatch({type: 'SESSION/CANCELLED'});
  };
};

export const clean = () => {
  return dispatch => {
    dispatch({type: 'SESSION/CLEAN'});
  };
};

export const finish = sessionId => {
  return () => {
    return SessionService.finish({session_id: sessionId});
  };
};
