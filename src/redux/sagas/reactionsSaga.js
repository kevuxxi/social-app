import { all, call, cancelled, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import {
    fetchPostReactionsRequested,
    fetchPostReactionsSucceeded,
    fetchPostReactionsFailed,
    toggleLikeRequested,
    toggleLikeStarted,
    toggleLikeOptimistic,
    toggleLikeRollback,
    toggleLikeSucceeded,
    toggleLikeFailed
} from "../slices/reactionsSlice";
import { getReactionsPost, getUserReactionInPost, toggleReaction } from "../../api/reactionsApi";

const REACTION_TYPES = ["LIKE", "DISLIKE", "LOVE", "HAHA", "WOW", "SAD"];

const resolvePostId = (payload) => payload?.postId ?? payload;

const resolveReactionType = (payload) => {
    const rawType = payload?.reactionType ?? payload?.status ?? "LIKE";
    const normalized = String(rawType).toUpperCase();
    return REACTION_TYPES.includes(normalized) ? normalized : "LIKE";
};

function* workerFetchReactions(action) {
    const postId = resolvePostId(action.payload);
    if (!postId) {
        yield put(fetchPostReactionsFailed({ postId, error: "postId required" }));
        return;
    }
    try {
        const currentReaction = yield select((state) => state.reactions?.byPostId?.[postId]);
        const reactions = yield call(getReactionsPost, postId);

        // Build counts by reaction type from API response
        // API returns: [{"reaction_type":"DISLIKE","count":2}, {"reaction_type":"LIKE","count":5}, ...]
        let reactionCounts = {};
        let totalCount = 0;

        if (Array.isArray(reactions)) {
            reactions.forEach((item) => {
                const type = String(item?.reaction_type ?? "").toUpperCase();
                const count = Number(item?.count ?? 0);
                if (type && REACTION_TYPES.includes(type)) {
                    reactionCounts[type] = count;
                    totalCount += count;
                }
            });
        }

        // Get user's reaction from API
        let myReactionType = currentReaction?.myReactionType ?? null;
        const userId = yield select((state) => state.auth?.user?.id ?? null);

        if (userId) {
            try {
                const userReaction = yield call(getUserReactionInPost, userId, postId);
                // Response: { status: true, reaction: "SAD", userId: 1, postId: 3 }
                if (userReaction?.reaction) {
                    myReactionType = String(userReaction.reaction).toUpperCase();
                } else if (userReaction?.status === false) {
                    myReactionType = null;
                }
            } catch (err) {
                // Si falla, mantener el estado local
                console.warn('Could not fetch user reaction:', err);
            }
        }

        yield put(fetchPostReactionsSucceeded({
            postId,
            reactionCounts,
            totalCount,
            myReactionType
        }));
    } catch (error) {
        const message = error?.message ?? "Error al cargar reacciones";
        if (message.includes("No se encontraron reacciones")) {
            yield put(fetchPostReactionsSucceeded({ postId, reactionCounts: {}, totalCount: 0, myReactionType: null }));
            return;
        }
        yield put(fetchPostReactionsFailed({ postId, error: message }));
    } finally {
        if (yield cancelled()) {
            yield put(fetchPostReactionsFailed({ postId, error: null }));
        }
    }
}

function* workerToggleReaction(action) {
    const postId = resolvePostId(action.payload);
    const userId = yield select((state) => state.auth?.user?.id ?? null);
    const reactionState = yield select((state) => state.reactions?.byPostId?.[postId]);
    const reactionType = resolveReactionType(action.payload);
    if (!postId || !userId) {
        return;
    }
    if (reactionState?.loading) {
        return;
    }

    yield put(toggleLikeStarted({ postId }));
    yield put(toggleLikeOptimistic({ postId, reactionType }));
    try {
        yield call(toggleReaction, userId, postId, reactionType);
        yield put(toggleLikeSucceeded({ postId }));
        yield put(fetchPostReactionsRequested(postId));
    } catch (error) {
        yield put(toggleLikeRollback({ postId, reactionType }));
        yield put(toggleLikeFailed({ postId, error: error.message }));
    } finally {
        if (yield cancelled()) {
            yield put(toggleLikeFailed({ postId, error: null }));
        }
    }
}

function* watchFetchReactions() {
    yield takeEvery(fetchPostReactionsRequested.type, workerFetchReactions);
}

function* watchToggleReactions() {
    yield takeLatest(toggleLikeRequested.type, workerToggleReaction);
}

export default function* reactionsSaga() {
    yield all([watchFetchReactions(), watchToggleReactions()]);
}
