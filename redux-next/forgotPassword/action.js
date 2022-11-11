export const actionTypes = {
  GET_OTP: "GET_OTP",
  GET_OTP_SUCCESS: "GET_OTP_SUCCESS",
  GET_OTP_ERROR: "GET_OTP_ERROR",
};

export function getOtp(data) {
  return {
    type: actionTypes.GET_OTP,
    payload: data,
  };
}
export function getOtp_success(data) {
  return {
    type: actionTypes.GET_OTP_SUCCESS,
    payload: data,
  };
}
export function getOtp_error(data) {
  return {
    type: actionTypes.GET_OTP_ERROR,
    payload: data,
  };
}
