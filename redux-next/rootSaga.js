import { all } from "redux-saga/effects";
import loginSaga from "./login/saga";
import registerSaga from "./register/saga";
import getUserBasicSaga from "./getUserBasic/saga";
import uploaderBAsicDataSaga from "./uploadDataBasic/saga";
import getProfilesListSaga from "./profileList/saga";
import userJobProfile from "./getJobProfile/saga";
export default function* rootSaga() {
  yield all([
    registerSaga(),
    loginSaga(),
    getUserBasicSaga(),
    uploaderBAsicDataSaga(),
    getProfilesListSaga(),
    userJobProfile(),
  ]);
}
