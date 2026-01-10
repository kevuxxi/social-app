import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    followRequested,
    followOptimistic,
    followRollback,
    followSucceeded,
    followFailed,
    unfollowRequested,
    unfollowOptimistic,
    unfollowRollback,
    unfollowSucceeded,
    unfollowFailed
} from "../slices/followsSlice";
import { follow, unfollow } from "../../api/followsApi";

function* workerFollow(action) {
    const targetUserId = action.payload;
    if (!targetUserId) {
        yield put(followFailed({ targetUserId, error: "targetUserId required" }));
        return;
    }
    yield put(followOptimistic(targetUserId));
    try {
        yield call(follow, targetUserId);
        yield put(followSucceeded(targetUserId));
    } catch (error) {
        yield put(followFailed({ targetUserId, error: error.message }));
        yield put(followRollback(targetUserId));
    }
}

function* workerUnfollow(action) {
    const targetUserId = action.payload;
    if (!targetUserId) {
        yield put(unfollowFailed({ targetUserId, error: "targetUserId required" }));
        return;
    }
    yield put(unfollowOptimistic(targetUserId));
    try {
        yield call(unfollow, targetUserId);
        yield put(unfollowSucceeded(targetUserId));
    } catch (error) {
        yield put(unfollowFailed({ targetUserId, error: error.message }));
        yield put(unfollowRollback(targetUserId));
    }
}

function* watchFollow() {
    yield takeLatest(followRequested.type, workerFollow);
}

function* watchUnfollow() {
    yield takeLatest(unfollowRequested.type, workerUnfollow);
}

export default function* followsSaga() {
    yield all([watchFollow(), watchUnfollow()]);
}


