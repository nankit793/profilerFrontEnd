export const actionTypes = {
  GET_USER_BASIC_DATA: "GET_USER_BASIC_DATA",
  GET_USER_BASIC_DATA_SUCCESS: "GET_USER_BASIC_DATA_SUCCESS",
  GET_USER_BASIC_DATA_ERROR: "GET_USER_BASIC_DATA_ERROR",
};

export function getBasicData(data) {
  return {
    type: actionTypes.GET_USER_BASIC_DATA,
    payload: data,
  };
}

export function getBasicData_success(data) {
  return {
    type: actionTypes.GET_USER_BASIC_DATA_SUCCESS,
    payload: data,
  };
}

export function getBasicData_error(data) {
  return {
    type: actionTypes.GET_USER_BASIC_DATA_ERROR,
    payload: data,
  };
}
