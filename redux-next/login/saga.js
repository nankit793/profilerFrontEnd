import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import { saveTokensOnLocal } from "../apiRequests/localStoragePortal";
import {
  actionTypes,
  loginUser_Success,
  loginUser_Error,
  logout_Success,
  logout_Error,
} from "./action";
function* loginUserSaga(action) {
  try {
    const result = yield call(apiCalling.makePostRequests, {
      method: "post",
      mode: "cors",
      url: `${process.env.BACKEND_URL}/user/login`,
      body: action.payload,
    });
    const { data } = result;
    if (result.status === 200) {
      const { accessToken, refreshToken } = data;
      saveTokensOnLocal("accessToken", accessToken);
      saveTokensOnLocal("idToken", refreshToken);
      saveTokensOnLocal("userid", action.payload.userid);
      yield put(loginUser_Success(result));
    } else {
      yield put(loginUser_Error(result));
    }
  } catch (error) {
    yield put(loginUser_Error(error.response));
  }
}

export default function* loginSaga() {
  yield all([takeEvery(actionTypes.LOGIN_USER, loginUserSaga)]);
}
