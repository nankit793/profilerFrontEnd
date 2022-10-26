import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  postUserRegistration_Success,
  postUserRegistration_Error,
} from "./action";

//user registraion
function* postUserRegistrationSaga(action) {
  try {
    console.log("first");
    const result = yield call(apiCalling.makePostRequests, {
      method: "post",
      url: "http://localhost:5000/user/register",
      body: action.payload,
    });
    if (result.status === 200) {
      yield put(postUserRegistration_Success(result));
    } else {
      yield put(postUserRegistration_Error(result));
    }
  } catch (error) {
    yield put(postUserRegistration_Error(error));
  }
}

export default function* registerSaga() {
  yield all([
    takeEvery(actionTypes.POST_USER_REGISTRATION, postUserRegistrationSaga),
  ]);
}
