import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    fetchPostReactionsRequested,
    fetchPostReactionsSucceeded,
    fetchPostReactionsFailed,
    toggleLikeRequested,
    toggleLikeOptimistic,
    toggleLikeRollback,
    toggleLikeSucceeded,
    toggleLikeFailed
} from "../slices/reactionsSlice";
import { getReactionsPost, toggleReaction } from "../../api/reactionsApi";

const resolvePostId = (payload) => payload?.postId ?? payload;

function* workerFetchReactions(action) {
    const postId = resolvePostId(action.payload);
    if (!postId) {
        yield put(fetchPostReactionsFailed({ postId, error: "postId required" }));
        return;
    }
    try {
        const reaction = yield call(getReactionsPost, postId);
        const likeCount = reaction?.likeCount ?? reaction?.likes_count ?? 0;
        const likedByMe = reaction?.likedByMe ?? reaction?.liked_by_me ?? false;
        yield put(fetchPostReactionsSucceeded({ postId, likeCount, likedByMe }));
    } catch (error) {
        yield put(fetchPostReactionsFailed({ postId, error: error.message }));
    }
}

function* workerToggleReaction(action) {
    const { postId, userId, status } = action.payload || {};
    if (!postId || !userId) {
        yield put(toggleLikeFailed({ postId, error: "postId and userId required" }));
        return;
    }
    yield put(toggleLikeOptimistic({ postId }));
    try {
        yield call(toggleReaction, userId, postId, status);
        yield put(toggleLikeSucceeded({ postId }));
    } catch (error) {
        yield put(toggleLikeFailed({ postId, error: error.message }));
        yield put(toggleLikeRollback({ postId }));
    }
}

function* watchFetchReactions() {
    yield takeLatest(fetchPostReactionsRequested.type, workerFetchReactions);
}

function* watchToggleReactions() {
    yield takeLatest(toggleLikeRequested.type, workerToggleReaction);
}

export default function* reactionsSaga() {
    yield all([watchFetchReactions(), watchToggleReactions()]);
}
