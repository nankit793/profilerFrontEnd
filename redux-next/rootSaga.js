import { all } from "redux-saga/effects";
import loginSaga from "./login/saga";
import registerSaga from "./register/saga";
import getUserBasicSaga from "./getUserBasic/saga";
import uploaderBAsicDataSaga from "./uploadDataBasic/saga";
import getProfilesListSaga from "./profileList/saga";
export default function* rootSaga() {
  console.log("rootreducer");

  yield all([
    registerSaga(),
    loginSaga(),
    getUserBasicSaga(),
    uploaderBAsicDataSaga(),
    getProfilesListSaga(),
  ]);
}
