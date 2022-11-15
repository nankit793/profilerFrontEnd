import { all } from "redux-saga/effects";
import loginSaga from "./login/saga";
import registerSaga from "./register/saga";
import getUserBasicSaga from "./getUserBasic/saga";
export default function* rootSaga() {
  yield all([registerSaga(), loginSaga(), getUserBasicSaga()]);
}
