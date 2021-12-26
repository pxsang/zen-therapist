import Immutable from 'seamless-immutable';

const INIT_STATE = Immutable({
  isLoading: false,
  services: [],
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SERVICE/GET_SERVICE_REQUEST':
      return state.set('isLoading', true);
    case 'SERVICE/GET_SERVICE_SUCCESS':
      return state
        .set('isLoading', false)
        .set('services', action.data);
    default:
      return state;
  }
};
