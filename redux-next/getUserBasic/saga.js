import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getBasicData_success,
  getBasicData_error,
} from "./actions";

function* getUserBasicDataSaga(action) {
  try {
    const result = yield call(apiCalling.makeGetRequest, {
      method: "get",
      // mode: "cors",
      url: "http://localhost:5000/getbasic",
      body: action.payload,
    });
    if (result.status === 200) {
      yield put(getBasicData_success(result));
    } else {
      yield put(getBasicData_error(result));
    }
  } catch (error) {
    yield put(getBasicData_error(error.response));
  }
}

export default function* getUserBasicSaga() {
  yield all([takeEvery(actionTypes.GET_USER_BASIC_DATA, getUserBasicDataSaga)]);
}
