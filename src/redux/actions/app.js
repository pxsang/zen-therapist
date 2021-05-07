export const setFirstTime = isFirstTime => {
  return dispatch => {
    return dispatch({
      type: 'APP/SET_FIRST_TIME',
      data: isFirstTime,
    });
  };
};
