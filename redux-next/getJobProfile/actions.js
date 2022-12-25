export const actionTypes = {
  // get user job profile data
  GET_USER_JOB_PROFILE: "GET_USER_JOB_PROFILE",
  GET_USER_JOB_PROFILE_SUCCESS: "GET_USER_JOB_PROFILE_SUCCESS",
  GET_USER_JOB_PROFILE_ERROR: "GET_USER_JOB_PROFILE_ERROR",
};

export function getJobProfile(data) {
  return {
    type: actionTypes.GET_USER_JOB_PROFILE,
    payload: data,
  };
}

export function getJobProfile_success(data) {
  return {
    type: actionTypes.GET_USER_JOB_PROFILE_SUCCESS,
    payload: data,
  };
}

export function getJobProfile_error(data) {
  return {
    type: actionTypes.GET_USER_JOB_PROFILE_ERROR,
    payload: data,
  };
}
