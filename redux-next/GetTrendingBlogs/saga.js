import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getTrendingBlogs_success,
  getTrendingBlogs_error,
} from "./action";

function* getTrendingBlogs(action) {
  try {
    const result = yield call(apiCalling.makeGetRequest, {
      method: "get",
      // mode: "cors",
      url: `${process.env.BACKEND_URL}/trendingBlogs`,
      body: action.payload,
    });
    if (result.status === 200 && result.data) {
      yield put(getTrendingBlogs_success(result.data));
    } else {
      yield put(getTrendingBlogs_error(result));
    }
  } catch (error) {
    yield put(getTrendingBlogs_error(error.response));
  }
}

export default function* getTrendingBlogsSaga() {
  yield all([takeEvery(actionTypes.GET_TRENDING_BLOGS, getTrendingBlogs)]);
}
