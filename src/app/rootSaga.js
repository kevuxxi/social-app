import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([]);
    console.log("Root saga running");
}