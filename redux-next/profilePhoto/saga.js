import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getProfilePicture_success,
  getProfilePicture_error,
} from "./action";

function* getProfilePic(action) {
  try {
    const userid = localStorage.getItem("userid");
    const result = yield call(apiCalling.makeGetRequest, {
      method: "get",
      // mode: "cors",
      url: `${process.env.BACKEND_URL}/profilePhoto?userid=${userid}`,
      body: action.payload,

      // responseType: "arrayBuffer",
    });
    if (result.status === 200) {
      yield put(getProfilePicture_success(result));
    } else {
      yield put(getProfilePicture_error(result));
    }
  } catch (error) {
    console.log(error);
    yield put(getProfilePicture_error(error.response));
  }
}

export default function* getProfilePicSaga() {
  yield all([takeEvery(actionTypes.GET_PROFILE_PICTURE, getProfilePic)]);
}
