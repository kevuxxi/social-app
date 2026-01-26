import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
    fetchCommentsRequested,
    fetchCommentsSucceeded,
    fetchCommentsFailed,
    addCommentRequested,
    addCommentOptimistic,
    addCommentReplaceTemp,
    addCommentFailed
} from "../slices/commentsSlice";
import { addComment, readComments } from "../../api/commentsApi";
import { getUserReactionInComment } from "../../api/reactionsApi";

const resolvePostId = (payload) => payload?.postId ?? payload;
const resolveCommentId = (comment) =>
    comment?.comment_id ?? comment?.id ?? comment?._id ?? comment?.comment?.id ?? null;

const normalizeComment = (comment, fallback) => {
    const source = comment?.comment ?? comment?.data ?? comment ?? {};
    return {
        id: source.id ?? source.comment_id ?? source._id ?? fallback.id,
        userId: source.userId ?? source.user_id ?? fallback.userId,
        comment_text: source.comment_text ?? source.text ?? fallback.comment_text,
        created_at: source.created_at ?? source.createdAt ?? fallback.created_at,
        pending: false
    };
};

function* workerFetchComments(action) {
    const postId = resolvePostId(action.payload);
    if (!postId) {
        yield put(fetchCommentsFailed({ postId, error: "postId required" }));
        return;
    }
    try {
        const comments = yield call(readComments, postId);
        const userId = yield select((state) => state.auth?.user?.id ?? null);

        if (!userId || !Array.isArray(comments) || comments.length === 0) {
            yield put(fetchCommentsSucceeded({ postId, items: comments }));
            return;
        }

        const reactions = yield all(
            comments.map((comment) => {
                const commentId = resolveCommentId(comment);
                if (!commentId) return null;
                return call(getUserReactionInComment, userId, commentId);
            })
        );

        const items = comments.map((comment, index) => {
            const reaction = reactions[index];
            const reactionType = reaction?.reaction ?? null;
            return {
                ...comment,
                myReactionType: reactionType ? String(reactionType).toUpperCase() : null
            };
        });

        yield put(fetchCommentsSucceeded({ postId, items }));
    } catch (error) {
        yield put(fetchCommentsFailed({ postId, error: error.message }));
    }
}

function* workerAddComment(action) {
    const { postId, userId, text } = action.payload || {};

    if (!postId || !userId) {
        yield put(addCommentFailed({ postId, tempId: null, error: "postId and userId required" }));
        return;
    }
    const tempId = `temp-${Date.now()}`;
    const tempComment = {
        id: tempId,
        userId,
        comment_text: text,
        created_at: Date.now(),
        pending: true
    };
    yield put(addCommentOptimistic({ postId, tempComment }));
    try {
        const response = yield call(addComment, userId, postId, text);
        const realComment = normalizeComment(response, tempComment);
        yield put(addCommentReplaceTemp({ postId, tempId, realComment }));
    } catch (error) {
        yield put(addCommentFailed({ postId, tempId, error: error.message }));
    }
}

function* watchFetchComments() {
    yield takeLatest(fetchCommentsRequested.type, workerFetchComments);
}

function* watchAddComment() {
    yield takeLatest(addCommentRequested.type, workerAddComment);
}

export default function* commentsSaga() {
    yield all([watchAddComment(), watchFetchComments()]);
}
