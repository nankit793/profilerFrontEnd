import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getUserPortfolioBookmarks_success,
  getUserPortfolioBookmarks_error,
} from "./action";

function* getUserPortfolioBookmarks(action) {
  try {
    const result = yield call(apiCalling.makeLoggedGetRequest, {
      method: "get",
      // mode: "cors",
      url: `${process.env.BACKEND_URL}/portfolio/bookmarks`,
      //   body: action.payload,
    });
    if (
      result.status === 200 &&
      result.data &&
      result.data.state &&
      result.data.bookmarks
    ) {
      yield put(getUserPortfolioBookmarks_success(result.data.bookmarks));
    } else {
      yield put(getUserPortfolioBookmarks_error([]));
    }
  } catch (error) {
    yield put(getUserPortfolioBookmarks_error(error.response));
  }
}

function* getUserPortfolioBookmarks_update(newArr) {
  try {
    yield put(getUserPortfolioBookmarks_success(newArr.payload));
  } catch (error) {}
}

export default function* portfolioBookmarksSaga() {
  yield all([
    takeEvery(
      actionTypes.GET_USER_PORTFOLIO_BOOKMARKS,
      getUserPortfolioBookmarks
    ),
    takeEvery(
      actionTypes.GET_USER_PORTFOLIO_BOOKMARKS_UPDATE,
      getUserPortfolioBookmarks_update
    ),
  ]);
}
