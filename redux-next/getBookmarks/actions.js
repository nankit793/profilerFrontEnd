export const actionTypes = {
  // get user job profile data
  GET_USER_BOOKMARKS: "GET_USER_BOOKMARKS",
  GET_USER_BOOKMARKS_SUCCESS: "GET_USER_BOOKMARKS_SUCCESS",
  GET_USER_BOOKMARKS_UPDATE: "GET_USER_BOOKMARKS_UPDATE",
  GET_USER_BOOKMARKS_ERROR: "GET_USER_BOOKMARKS_ERROR",
};

export function getUserBookmarks(data) {
  return {
    type: actionTypes.GET_USER_BOOKMARKS,
    payload: data,
  };
}

export function getUserBookmarks_success(data) {
  return {
    type: actionTypes.GET_USER_BOOKMARKS_SUCCESS,
    payload: data,
  };
}

export function getUserBookmarks_update(data) {
  return {
    type: actionTypes.GET_USER_BOOKMARKS_UPDATE,
    payload: data,
  };
}

export function getUserBookmarks_error(data) {
  return {
    type: actionTypes.GET_USER_BOOKMARKS_ERROR,
    payload: data,
  };
}
