import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getFollowingList_success,
  getFollowingList_error,
} from "./actions";

function* getFollowingList(action) {
  try {
    const result = yield call(apiCalling.makeLoggedGetRequest, {
      method: "get",
      // mode: "cors",
      url: `${process.env.BACKEND_URL}/followingList`,
      body: action.payload,
    });
    if (result.status === 200) {
      yield put(
        getFollowingList_success(result.data.followingOfCurrentUser.following)
      );
    } else {
      yield put(getFollowingList_error([]));
    }
  } catch (error) {
    yield put(getFollowingList_error([]));
  }
}
function* updateFollowingList(action) {
  try {
    yield put(getFollowingList_success(action.payload));
  } catch (error) {}
}

export default function* getFollowingListSaga() {
  yield all([
    takeEvery(actionTypes.GET_USER_FOLLOWING_LIST, getFollowingList),
    takeEvery(actionTypes.GET_USER_FOLLOWING_LIST_UPDATE, updateFollowingList),
  ]);
}
