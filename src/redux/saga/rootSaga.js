import studentSaga from "./studentSaga";
import { all } from "redux-saga/effects";

function* rootSaga() {
  return yield all([studentSaga()]);
}

export default  rootSaga;
