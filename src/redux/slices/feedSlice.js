import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    following: {
        items: [],
        loading: false,
        error: null,
        fetchedAt: null
    }
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        fetchFollowingFeedRequested: (state) => {
            state.following.loading = true
            state.following.error = null
        },
        fetchFollowingFeedSucceeded: (state, action) => {
            const items = action.payload
            state.following.items = items
            state.following.loading = false
            state.following.fetchedAt = Date.now()
        },
        fetchFollowingFeedFailed: (state, action) => {
            state.following.loading = false
            state.following.error = action.payload
        }
    }
})

export const {
    fetchFollowingFeedRequested,
    fetchFollowingFeedSucceeded,
    fetchFollowingFeedFailed
} = feedSlice.actions

export default feedSlice.reducer
