export const actionTypes = {
  UPLOAD_BASIC_DATA: "UPLOAD_BASIC_DATA",
  UPLOAD_BASIC_DATA_SUCCESS: "UPLOAD_BASIC_DATA_SUCCESS",
  UPLOAD_BASIC_DATA_ERROR: " UPLOAD_BASIC_DATA_ERROR ",
};

export function uploadData(data) {
  return {
    type: actionTypes.UPLOAD_BASIC_DATA,
    payload: data,
  };
}

export function uploadData_success(data) {
  return {
    type: actionTypes.UPLOAD_BASIC_DATA_SUCCESS,
    payload: data,
  };
}

export function uploadData_error(data) {
  return {
    type: actionTypes.UPLOAD_BASIC_DATA_ERROR,
    payload: data,
  };
}
