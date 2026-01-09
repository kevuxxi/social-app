import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byUserId: {}
}

const defaultFollowState = {
    isFollowing: false,
    loading: false,
    error: null
}

const ensureUser = (state, userId) => {
    if (!state.byUserId[userId]) {
        state.byUserId[userId] = { ...defaultFollowState }
    }
}

const followsSlice = createSlice({
    name: 'follows',
    initialState,
    reducers: {
        followRequested: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].loading = true
            state.byUserId[targetUserId].error = null
        },
        followOptimistic: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].isFollowing = true
        },
        followRollback: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].isFollowing = false
        },
        followSucceeded: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].isFollowing = true
            state.byUserId[targetUserId].loading = false
        },
        followFailed: (state, action) => {
            const { targetUserId, error } = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].loading = false
            state.byUserId[targetUserId].error = error
        },
        unfollowRequested: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].loading = true
            state.byUserId[targetUserId].error = null
        },
        unfollowOptimistic: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].isFollowing = false
        },
        unfollowRollback: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].isFollowing = true
        },
        unfollowSucceeded: (state, action) => {
            const targetUserId = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].isFollowing = false
            state.byUserId[targetUserId].loading = false
        },
        unfollowFailed: (state, action) => {
            const { targetUserId, error } = action.payload
            ensureUser(state, targetUserId)
            state.byUserId[targetUserId].loading = false
            state.byUserId[targetUserId].error = error
        }
    }
})

export const {
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
} = followsSlice.actions

export default followsSlice.reducer
