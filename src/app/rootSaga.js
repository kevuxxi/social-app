import { all, fork } from "redux-saga/effects";
import authSaga from "../redux/sagas/authSaga";
import usersSaga from "../redux/sagas/usersSaga";
import postsSaga from "../redux/sagas/postsSaga";
import reactionsSaga from "../redux/sagas/reactionsSaga";
import commentsSaga from "../redux/sagas/commentsSaga";
import followsSaga from "../redux/sagas/followsSaga";
import feedSaga from "../redux/sagas/feedSaga";

export default function* rootSaga() {
    yield all([fork(authSaga), fork(usersSaga), fork(postsSaga), fork(reactionsSaga), fork(commentsSaga), fork(followsSaga), fork(feedSaga)]);
    console.log("Root saga running");
}