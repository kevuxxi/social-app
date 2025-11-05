import { all, fork } from "redux-saga/effects";
import authSaga from "../redux/sagas/authSaga";

export default function* rootSaga() {
    yield all([fork(authSaga)]);
    console.log("Root saga running");
}