import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: {
        list: [],
    },
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0
    },
    postDetail: null,
    createLoading: false,
    createError: null,
    createSuccess: false,

}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPost: (state) => state,
        setCreateLoading: (state, action) => { state.createLoading = action.payload },
        setCreateError: (state, action) => { state.createError = action.payload },
        setCreateSuccess: (state, action) => { state.createSuccess = action.payload },
        fetchPosts: (state) => state,
        setPosts: (state, action) => {
            if (!state.posts || Array.isArray(state.posts)) {
                state.posts = { list: [] };
            }
            state.posts.list = action.payload;
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
        },


    }

})

export const {
    fetchPosts,
    setPosts,
    setPostDetail,
    setPagination,
    setLoading,
    setError,
    createPost,
    setCreateError,
    setCreateSuccess,
    setCreateLoading
} = postsSlice.actions;


export default postsSlice.reducer;
