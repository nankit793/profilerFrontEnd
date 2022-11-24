// user login in
export const actionTypes = {
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR: "LOGIN_USER_ERROR",

  // initial state
  SET_INITIAL_STATE: "SET_INITIAL_STATE",
};

// user login
export function loginUser(data) {
  return {
    type: actionTypes.LOGIN_USER,
    payload: data,
  };
}

export function loginUser_Success(data) {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    payload: data,
  };
}

export function loginUser_Error(data) {
  return {
    type: actionTypes.LOGIN_USER_ERROR,
    payload: data,
  };
}

export function clearStore(data) {
  // console.log("clear action");
  return {
    type: actionTypes.SET_INITIAL_STATE,
    payload: data,
  };
}
