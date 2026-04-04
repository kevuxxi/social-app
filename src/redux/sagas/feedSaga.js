import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    fetchFollowingFeedRequested,
    fetchFollowingFeedSucceeded,
    fetchFollowingFeedFailed
} from "../slices/feedSlice";
import { getFollowingFeed } from "../../api/followsApi";

function* workerFetchFollowingFeed() {
    try {
        const posts = yield call(getFollowingFeed);
        yield put(fetchFollowingFeedSucceeded(posts));
    } catch (error) {
        yield put(fetchFollowingFeedFailed(error.message));
    }
}

function* watchFetchFollowingFeed() {
    yield takeLatest(fetchFollowingFeedRequested.type, workerFetchFollowingFeed);
}

export default function* feedSaga() {
    yield all([watchFetchFollowingFeed()]);
}