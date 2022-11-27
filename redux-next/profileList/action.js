export const actionTypes = {
  GET_PROFILE_LIST: "GET_PROFILE_LIST",
  GET_PROFILE_LIST_SUCCESS: "GET_PROFILE_LIST_SUCCESS",
  GET_PROFILE_LIST_ERROR: "GET_PROFILE_LIST_ERROR",
};

export function getProfilesList(data) {
  return {
    type: actionTypes.GET_PROFILE_LIST,
    payload: data,
  };
}
export function getProfilesList_success(data) {
  return {
    type: actionTypes.GET_PROFILE_LIST_SUCCESS,
    payload: data,
  };
}
export function getProfilesList_error(data) {
  return {
    type: actionTypes.GET_PROFILE_LIST_ERROR,
    payload: data,
  };
}
