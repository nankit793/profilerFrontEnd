import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import { actionTypes, loginUser_Success, loginUser_Error } from "./action";
function* loginUserSaga(action) {
  try {
    console.log("first");
    const result = yield call(apiCalling.makePostRequests, {
      method: "post",
      mode: "cors",
      url: "http://localhost:5000/user/login",
      body: action.payload,
    });
    if (result.status === 200) {
      yield put(loginUser_Success(result));
    } else {
      yield put(loginUser_Error(result));
    }
  } catch (error) {
    yield put(loginUser_Error(error));
  }
}

export default function* loginSaga() {
  yield all([takeEvery(actionTypes.LOGIN_USER, loginUserSaga)]);
}
