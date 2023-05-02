import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";

import { actionTypes, uploadData_success, uploadData_error } from "./action";

function* uploadBAsicDataSaga(action) {
  //   console.log(action.payload);
  try {
    const result = yield call(apiCalling.makePatchRequest, {
      method: "patch",
      mode: "cors",
      url: `${process.env.BACKEND_URL}/getbasic`,
      data: action.payload,
    });
    if (result.status === 200) {
      yield put(uploadData_success(result));
    } else {
      yield put(uploadData_error(result));
    }
  } catch (error) {
    yield put(uploadData_error(error.response));
  }
}

export default function* uploaderBAsicDataSaga() {
  yield all([takeEvery(actionTypes.UPLOAD_BASIC_DATA, uploadBAsicDataSaga)]);
}
