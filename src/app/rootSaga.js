import { all, fork } from "redux-saga/effects";
import authSaga from "../redux/sagas/authSaga";
import usersSaga from "../redux/sagas/usersSaga";

export default function* rootSaga() {
    yield all([fork(authSaga), fork(usersSaga)]);
    console.log("Root saga running");
}