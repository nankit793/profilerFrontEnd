export const actionTypes = {
  GET_PROFILE_PICTURE: "GET_PROFILE_PICTURE",
  GET_PROFILE_PICTURE_SUCCESS: "GET_PROFILE_PICTURE_SUCCESS",
  GET_PROFILE_PICTURE_ERROR: "GET_PROFILE_PICTURE_ERROR",
};

export function getProfilePicture(data) {
  return {
    type: actionTypes.GET_PROFILE_PICTURE,
    payload: data,
  };
}

export function getProfilePicture_success(data) {
  return {
    type: actionTypes.GET_PROFILE_PICTURE_SUCCESS,
    payload: data,
  };
}

export function getProfilePicture_error(data) {
  return {
    type: actionTypes.GET_PROFILE_PICTURE_ERROR,
    payload: data,
  };
}
