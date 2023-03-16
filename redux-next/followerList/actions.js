export const actionTypes = {
  GET_USER_FOLLOWING_LIST: "GET_USER_FOLLOWING_LIST",
  GET_USER_FOLLOWING_LIST_SUCCESS: "GET_USER_FOLLOWING_LIST_SUCCESS",
  GET_USER_FOLLOWING_LIST_UPDATE: "GET_USER_FOLLOWING_LIST_UPDATE",
  GET_USER_FOLLOWING_LIST_ERROR: "GET_USER_FOLLOWING_LIST_ERROR",
};

export function getFollowingList(data) {
  return {
    type: actionTypes.GET_USER_FOLLOWING_LIST,
    payload: data,
  };
}
export function updateFollowingList(data) {
  return {
    type: actionTypes.GET_USER_FOLLOWING_LIST_UPDATE,
    payload: data,
  };
}

export function getFollowingList_success(data) {
  return {
    type: actionTypes.GET_USER_FOLLOWING_LIST_SUCCESS,
    payload: data,
  };
}

export function getFollowingList_error(data) {
  return {
    type: actionTypes.GET_USER_FOLLOWING_LIST_ERROR,
    payload: data,
  };
}
