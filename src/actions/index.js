export const CHANGE_LOGGED_IN_STATUS = 'CHANGE_LOGGED_IN_STATUS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_TOKEN = 'SET_TOKEN';

export const changeLoggedInStatus = newStatus => ({
  type: CHANGE_LOGGED_IN_STATUS,
  payload: newStatus,
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});
