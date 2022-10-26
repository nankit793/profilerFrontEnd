import { all } from "redux-saga/effects";
import loginSaga from "./login/saga";
import registerSaga from "./register/saga";
export default function* rootSaga() {
  yield all([registerSaga(), loginSaga()]);
}
