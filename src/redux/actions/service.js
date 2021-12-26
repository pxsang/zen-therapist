import ServiceService from '../services/service';

export const getServices = () => {
  return dispatch => {
    dispatch({type: 'SERVICE/GET_SERVICE_REQUEST'});
    return ServiceService.getServices()
      .then(response => {
        if (response && response.data) {
          dispatch({
            type: 'SERVICE/GET_SERVICE_SUCCESS',
            data: response.data,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: 'SERVICE/GET_SERVICE_FAILED',
          data: error,
        });
      });
  };
};
