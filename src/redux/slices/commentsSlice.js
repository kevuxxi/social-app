import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byPostId: {}
}

const defaultCommentsState = {
    items: [],
    loading: false,
    creating: false,
    error: null
}

const ensurePost = (state, postId) => {
    if (!state.byPostId[postId]) {
        state.byPostId[postId] = { ...defaultCommentsState }
    }
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        fetchCommentsRequested: (state, action) => {
            const postId = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = true
            state.byPostId[postId].error = null
        },
        fetchCommentsSucceeded: (state, action) => {
            const { postId, items } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].items = items
            state.byPostId[postId].loading = false
        },
        fetchCommentsFailed: (state, action) => {
            const { postId, error } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = false
            state.byPostId[postId].error = error
        },
        addCommentRequested: (state, action) => {
            const { postId } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].creating = true
            state.byPostId[postId].error = null
        },
        addCommentOptimistic: (state, action) => {
            const { postId, tempComment } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].items.push(tempComment)
        },
        addCommentReplaceTemp: (state, action) => {
            const { postId, tempId, realComment } = action.payload
            ensurePost(state, postId)
            const items = state.byPostId[postId].items;
            const idx = items.findIndex((comment) => comment.id === tempId);
            if (idx !== -1) {
                items[idx] = realComment;
            } else {
                items.push(realComment);
            }
            state.byPostId[postId].creating = false;
        },
        addCommentFailed: (state, action) => {
            const { postId, tempId, error } = action.payload;
            ensurePost(state, postId);
            state.byPostId[postId].items = state.byPostId[postId].items.filter(
                (c) => c.id !== tempId
            );
            state.byPostId[postId].creating = false;
            state.byPostId[postId].error = error;
        }
    }
})

export const {
    fetchCommentsRequested,
    fetchCommentsSucceeded,
    fetchCommentsFailed,
    addCommentRequested,
    addCommentOptimistic,
    addCommentReplaceTemp,
    addCommentFailed
} = commentsSlice.actions

export default commentsSlice.reducer
