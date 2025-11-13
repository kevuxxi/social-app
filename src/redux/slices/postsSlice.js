import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0
    },
    postDetail: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPostDetail: (state, action) => {
            state.postDetail = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = {
                ...state.pagination,
                ...action.payload
            };
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }

})

export const {
    setPosts,
    setPostDetail,
    setPagination,
    setLoading,
    setError,
} = postsSlice.actions;


export default postsSlice.reducer;
