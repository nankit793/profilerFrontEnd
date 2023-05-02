import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getProfilesList_success,
  getProfilesList_error,
} from "./action";

function* saga(action) {
  try {
    const result = yield call(apiCalling.makeGetRequest, {
      method: "get",
      // mode: "cors",
      url: `${process.env.BACKEND_URL}/user/profilerList`,
      body: action.payload,
    });
    if (result.status === 200) {
      yield put(getProfilesList_success(result));
    } else {
      yield put(getProfilesList_error(result));
    }
  } catch (error) {
    yield put(getProfilesList_error(error.response));
  }
}

export default function* getProfilesListSaga() {
  yield all([takeEvery(actionTypes.GET_PROFILE_LIST, saga)]);
}
