import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import { actionTypes, userReviewBlog_success } from "./actions";

function* sessionStorage(action) {
  try {
    yield put(userReviewBlog_success(action.payload));
  } catch (error) {}
}

export default function* sessionStorageSaga() {
  yield all([takeEvery(actionTypes.USER_REVIEW_BLOG, sessionStorage)]);
}
