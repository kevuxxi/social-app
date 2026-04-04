import { createSlice } from "@reduxjs/toolkit";

const REACTION_TYPES = ["LIKE", "DISLIKE", "LOVE", "HAHA", "WOW", "SAD"];

const initialState = {
    byPostId: {}
}

const defaultReactionState = {
    reactionCounts: {}, // { LIKE: 5, DISLIKE: 2, LOVE: 3, ... }
    totalCount: 0,
    myReactionType: null,
    loading: false,
    error: null
}

const ensurePost = (state, postId) => {
    if (!state.byPostId[postId]) {
        state.byPostId[postId] = { ...defaultReactionState, reactionCounts: {} }
    }
}

const normalizeReactionType = (value) => {
    if (!value) return "LIKE"
    const normalized = String(value).toUpperCase()
    return REACTION_TYPES.includes(normalized) ? normalized : "LIKE"
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
            const { postId, reactionCounts, totalCount, myReactionType } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].reactionCounts = reactionCounts ?? {}
            state.byPostId[postId].totalCount = totalCount ?? 0
            // Preserve myReactionType from local state if not provided
            if (myReactionType !== undefined) {
                state.byPostId[postId].myReactionType = myReactionType
            }
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
            state.byPostId[postId].error = null
        },
        toggleLikeStarted: (state, action) => {
            const { postId } = action.payload
            ensurePost(state, postId)
            state.byPostId[postId].loading = true
            state.byPostId[postId].error = null
        },
        toggleLikeOptimistic: (state, action) => {
            const { postId, reactionType } = action.payload
            ensurePost(state, postId)
            const normalizedType = normalizeReactionType(reactionType)
            const post = state.byPostId[postId]
            const prevType = post.myReactionType
            const wasActive = prevType === normalizedType

            if (wasActive) {
                // Toggle off - decrement count for this type
                post.myReactionType = null
                if (post.reactionCounts[normalizedType] > 0) {
                    post.reactionCounts[normalizedType] -= 1
                    post.totalCount -= 1
                }
            } else {
                // Toggle on or switch reaction
                if (prevType && post.reactionCounts[prevType] > 0) {
                    // Decrement previous reaction type
                    post.reactionCounts[prevType] -= 1
                    post.totalCount -= 1
                }
                // Increment new reaction type
                post.reactionCounts[normalizedType] = (post.reactionCounts[normalizedType] ?? 0) + 1
                post.totalCount += 1
                post.myReactionType = normalizedType
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
            const { postId, reactionType } = action.payload
            ensurePost(state, postId)
            const normalizedType = normalizeReactionType(reactionType)
            const post = state.byPostId[postId]
            const currentType = post.myReactionType
            const wasActive = currentType === normalizedType

            // Reverse the optimistic update
            if (wasActive) {
                // Was toggled on, now toggle off (rollback means it was off before)
                post.myReactionType = null
                if (post.reactionCounts[normalizedType] > 0) {
                    post.reactionCounts[normalizedType] -= 1
                    post.totalCount -= 1
                }
            } else {
                // Was toggled off or switched, restore previous state
                if (currentType && post.reactionCounts[currentType] > 0) {
                    post.reactionCounts[currentType] -= 1
                    post.totalCount -= 1
                }
                post.reactionCounts[normalizedType] = (post.reactionCounts[normalizedType] ?? 0) + 1
                post.totalCount += 1
                post.myReactionType = normalizedType
            }
        }
    }
})

export const {
    fetchPostReactionsRequested,
    fetchPostReactionsSucceeded,
    fetchPostReactionsFailed,
    toggleLikeRequested,
    toggleLikeStarted,
    toggleLikeOptimistic,
    toggleLikeRollback,
    toggleLikeSucceeded,
    toggleLikeFailed
} = reactionsSlice.actions

export default reactionsSlice.reducer
