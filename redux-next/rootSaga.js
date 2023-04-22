import { all } from "redux-saga/effects";
import loginSaga from "./login/saga";
import registerSaga from "./register/saga";
import getUserBasicSaga from "./getUserBasic/saga";
import uploaderBAsicDataSaga from "./uploadDataBasic/saga";
import getProfilesListSaga from "./profileList/saga";
import userJobProfile from "./getJobProfile/saga";
import getProfilePicSaga from "./profilePhoto/saga";
import getFollowingListSaga from "./followerList/saga";
import userBookMarks from "./getBookmarks/saga";
import authorBlogs from "./getAuthorBlogs/saga";
import getTrendingBlogsSaga from "./GetTrendingBlogs/saga";
import sessionStorageSaga from "./sessionStorage/saga";
export default function* rootSaga() {
  yield all([
    registerSaga(),
    loginSaga(),
    getUserBasicSaga(),
    uploaderBAsicDataSaga(),
    getProfilesListSaga(),
    userJobProfile(),
    getProfilePicSaga(),
    getFollowingListSaga(),
    userBookMarks(),
    authorBlogs(),
    getTrendingBlogsSaga(),
    sessionStorageSaga(),
  ]);
}
