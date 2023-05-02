import { all, takeEvery, put, call } from "redux-saga/effects";
import apiCalling from "../apiRequests/apiCalling";
import {
  actionTypes,
  getAuthorBlogs_success,
  getAuthorBlogs_error,
} from "./actions";

function* getAuthorBlogs(action) {
  try {
    const result = yield call(apiCalling.makeGetRequest, {
      method: "get",
      // mode: "cors",'

      url: `${process.env.BACKEND_URL}/blogPost/author/${action.payload}`,
      //   body: action.payload,
    });
    console.log(result, "the result");
    if (result.status === 200 && result.data && result.data.blogUpload) {
      yield put(getAuthorBlogs_success(result.data.blogUpload));
    } else {
      console.log("other error");
      yield put(getAuthorBlogs_error([]));
    }
  } catch (error) {
    console.log(error.message, error);
    yield put(getAuthorBlogs_error(error.response));
  }
}

function* getAuthorBlogs_update(newArr) {
  try {
    yield put(getAuthorBlogs_success(newArr.payload));
  } catch (error) {}
}

export default function* authorBlogs() {
  yield all([
    takeEvery(actionTypes.GET_AUTHOR_BLOGS, getAuthorBlogs),
    takeEvery(actionTypes.GET_AUTHOR_BLOGS_UPDATE, getAuthorBlogs_update),
  ]);
}
