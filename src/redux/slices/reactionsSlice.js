import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byPostId: {}
}

const defaultReactionState = {
    likeCount: 0,
    likedByMe: false,
    loading: false,
    error: null
}

const ensurePost = (state, postId) => {
    if (!state.byPostId[postId]) {
        state.byPostId[postId] = { ...defaultReactionState }
    }
}

const reactionsSlice = createSlice({
    name: 'reactions',
    initialState,
    reducers: {
        fetchPostReactionsRequested: (state, action) => {
            const postId = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = true
            state.byPostId[postId].error = null
        },
        fetchPostReactionsSucceeded: (state, action) => {
            const { postId, likeCount, likedByMe } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].likeCount = likeCount
            state.byPostId[postId].likedByMe = likedByMe
            state.byPostId[postId].loading = false
        },
        fetchPostReactionsFailed: (state, action) => {
            const { postId, error } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = false
            state.byPostId[postId].error = error
        },
        toggleLikeRequested: (state, action) => {
            const { postId } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = true
            state.byPostId[postId].error = null
        },
        toggleLikeOptimistic: (state, action) => {
            const { postId } = action.payload
            ensurePost(state, postId)
            if (!state.byPostId[postId].likedByMe) {
                state.byPostId[postId].likedByMe = true
                state.byPostId[postId].likeCount += 1
            } else {
                state.byPostId[postId].likedByMe = false
                state.byPostId[postId].likeCount -= 1
            }
        },
        toggleLikeSucceeded: (state, action) => {
            const { postId } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = false
            state.byPostId[postId].error = null
        },
        toggleLikeFailed: (state, action) => {
            const { postId, error } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = false
            state.byPostId[postId].error = error
        },
        toggleLikeRollback: (state, action) => {
            const { postId } = action.payload
            ensurePost(state, postId)
            if (state.byPostId[postId].likedByMe) {
                state.byPostId[postId].likedByMe = false
                state.byPostId[postId].likeCount -= 1
            } else {
                state.byPostId[postId].likedByMe = true
                state.byPostId[postId].likeCount += 1
            }
        }
    }
})

export const {
    fetchPostReactionsRequested,
    fetchPostReactionsSucceeded,
    fetchPostReactionsFailed,
    toggleLikeRequested,
    toggleLikeOptimistic,
    toggleLikeRollback,
    toggleLikeSucceeded,
    toggleLikeFailed
} = reactionsSlice.actions

export default reactionsSlice.reducer
