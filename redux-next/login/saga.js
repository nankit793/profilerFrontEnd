import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import { saveTokensOnLocal } from "../apiRequests/localStoragePortal";
import { actionTypes, loginUser_Success, loginUser_Error } from "./action";
function* loginUserSaga(action) {
  try {
    const result = yield call(apiCalling.makePostRequests, {
      method: "post",
      mode: "cors",
      url: "http://localhost:5000/user/login",
      body: action.payload,
    });
    const { data, status, message } = result;
    console.log(result);
    if (result.status === 200) {
      const { accessToken, refreshToken } = data;
      saveTokensOnLocal("accessToken", accessToken);
      saveTokensOnLocal("idToken", refreshToken);
      yield put(loginUser_Success(result));
    } else {
      yield put(loginUser_Error(status, message));
    }
  } catch (error) {
    yield put(loginUser_Error(error));
  }
}

export default function* loginSaga() {
  yield all([takeEvery(actionTypes.LOGIN_USER, loginUserSaga)]);
}
