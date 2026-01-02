import { all, fork } from "redux-saga/effects";
import authSaga from "../redux/sagas/authSaga";
import usersSaga from "../redux/sagas/usersSaga";
import postsSaga from "../redux/sagas/postsSaga";

export default function* rootSaga() {
    yield all([fork(authSaga), fork(usersSaga), fork(postsSaga)]);
    console.log("Root saga running");
}