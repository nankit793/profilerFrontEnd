import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  postUserRegistration_Success,
  postUserRegistration_Error,
} from "./action";
import axios from "axios";

//user registraion
function* postUserRegistrationSaga(action) {
  const result = yield call(apiCalling.makePostRequests, {
    method: "post",
    url: "http://localhost:5000/user/register",
    body: action.payload,
  });
  console.log(result);
  // const { data } = result;
  // try {
  //   console.log("inside saga of registration");
  //   // const data = yield axios({
  //   //   method: "post",
  //   //   url: "http://localhost:5000/user/register",
  //   //   body: params.body,
  //   // });
  //   // const { data } = result;
  //   // console.log(data);
  //   // if (result.status === 200) {
  //   //   yield put(postUserRegistration_Success(data));
  //   // } else {
  //   //   yield put(postUserRegistration_Error(data));
  //   // }
  // } catch (err) {
  //   yield put(postUserRegistration_Error(err));
  // }
}

export default function* registerSaga() {
  yield all([
    takeEvery(actionTypes.POST_USER_REGISTRATION, postUserRegistrationSaga),
  ]);
}
