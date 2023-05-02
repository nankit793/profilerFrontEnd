import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getUserBookmarks_success,
  getUserBookmarks_error,
} from "./actions";

function* getUserBookmarks(action) {
  try {
    const result = yield call(apiCalling.makeLoggedGetRequest, {
      method: "get",
      // mode: "cors",
      url: `${process.env.BACKEND_URL}/bookMarks`,
      //   body: action.payload,
    });
    if (
      result.status === 200 &&
      result.data &&
      result.data.state &&
      result.data.bookmarks
    ) {
      yield put(getUserBookmarks_success(result.data.bookmarks));
    } else {
      yield put(getUserBookmarks_error([]));
    }
  } catch (error) {
    yield put(getUserBookmarks_error(error.response));
  }
}

function* getUserBookmarks_update(newArr) {
  try {
    yield put(getUserBookmarks_success(newArr.payload));
  } catch (error) {}
}

export default function* userBookMarks() {
  yield all([
    takeEvery(actionTypes.GET_USER_BOOKMARKS, getUserBookmarks),
    takeEvery(actionTypes.GET_USER_BOOKMARKS_UPDATE, getUserBookmarks_update),
  ]);
}
