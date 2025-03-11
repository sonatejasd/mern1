import { takeLatest,call,put } from "redux-saga/effects";
import Ajax from "@/services/Ajax";

function* getStudents() {
  const result = yield call(Ajax.get, "/students/allStudents");
  yield put({ type: "STUDENTS", payload: result });
}

function* studentSaga() {
    yield takeLatest("GET_STUDENTS", getStudents)
}

export default studentSaga;

