import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getJobProfile_success,
  getJobProfile_error,
} from "./actions";

function* getJobProfile(action) {
  try {
    const result = yield call(apiCalling.makeGetRequest, {
      method: "get",
      // mode: "cors",
      url: `${process.env.BACKEND_URL}/user/jobProfiler/getJobProfiler`,
      body: action.payload,
    });
    if (result.status === 200) {
      yield put(getJobProfile_success(result));
    } else {
      yield put(getJobProfile_error(result));
    }
  } catch (error) {
    yield put(getJobProfile_error(error.response));
  }
}

export default function* getUserBasicSaga() {
  yield all([takeEvery(actionTypes.GET_USER_JOB_PROFILE, getJobProfile)]);
}
