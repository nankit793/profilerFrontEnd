// user login in
export const actionTypes = {
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_ERROR: "LOGIN_USER_ERROR",
};

// user login
export function loginUser(data) {
  console.log("login");
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
