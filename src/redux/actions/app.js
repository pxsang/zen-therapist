export const setFirstTime = isFirstTime => {
  return dispatch => {
    return dispatch({
      type: 'APP/SET_FIRST_TIME',
      data: isFirstTime,
    });
  };
};

export const switchLanguage = language => {
  return dispatch => {
    return dispatch({
      type: 'APP/SWITCH_LANGUAGE',
      data: language,
    });
  };
};
