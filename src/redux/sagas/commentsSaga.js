import { all, call, put, takeLatest } from "redux-saga/effects";
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

const resolvePostId = (payload) => payload?.postId ?? payload;

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
        yield put(fetchCommentsSucceeded({ postId, items: comments }));
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
