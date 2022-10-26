export const actionTypes = {
  // post user registration
  POST_USER_REGISTRATION: "POST_USER_REGISTRATION",
  POST_USER_REGISTRATION_SUCCESS: "POST_USER_REGISTRATION_SUCCESS",
  POST_USER_REGISTRATION_ERROR: "POST_USER_REGISTRATION_ERROR",
};

// user registration
export function postUserRegistration(data) {
  return {
    type: actionTypes.POST_USER_REGISTRATION,
    payload: data,
  };
}

export function postUserRegistration_Success(data) {
  return {
    type: actionTypes.POST_USER_REGISTRATION_SUCCESS,
    payload: data,
  };
}

export function postUserRegistration_Error(data) {
  return {
    type: actionTypes.POST_USER_REGISTRATION_ERROR,
    payload: data,
  };
}
