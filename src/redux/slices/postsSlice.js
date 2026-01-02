import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
    posts: {
        list: [],
    },
    profilePosts: {
        list: [],
        loading: false,
        error: null,
        pagination: {
            page: 1,
            limit: 10,
            total: 0
        },
        userId: null
    },
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0
    },
    createLoading: false,
    createError: null,
    createSuccess: false,
    postDetail: null,
    detailLoading: false,
    detailError: null,
    deleteLoading: false,
    deleteError: null,
    deletingPostId: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        createPost: (state) => state,
        setCreateLoading: (state, action) => {
            state.createLoading = action.payload
        },
        setCreateError: (state, action) => {
            state.createError = action.payload
        },
        setCreateSuccess: (state, action) => {
            state.createSuccess = action.payload
        },
        fetchPostById: (state) => state,
        setPostDetail: (state, action) => {
            state.postDetail = action.payload
        },
        setDetailError: (state, action) => {
            state.detailError = action.payload
        },
        setDetailLoading: (state, action) => {
            state.detailLoading = action.payload
        },
        clearPostDetail: (state) => {
            state.detailLoading = false
            state.detailError = null
            state.postDetail = null
        },
        deletePost: (state) => state,
        setDeleteLoading: (state, action) => {
            state.deleteLoading = action.payload
        },
        setDeleteError: (state, action) => {
            state.deleteError = action.payload
        },
        setDeletingPostId: (state, action) => {
            state.deletingPostId = action.payload
        },
        removePostFromList: (state, action) => {
            if (!state.posts || Array.isArray(state.posts)) {
                state.posts = { list: [] };
            }
            const idToRemove = action.payload;
            state.posts.list = state.posts.list.filter((post) => {
                const postId = post?.post_id ?? post?.id;
                return postId !== idToRemove;
            });
        },
        fetchPosts: (state) => state,
        setPosts: (state, action) => {
            if (!state.posts || Array.isArray(state.posts)) {
                state.posts = { list: [] };
            }
            state.posts.list = action.payload;
        },
        appendPosts: (state, action) => {
            if (!state.posts || Array.isArray(state.posts)) {
                state.posts = { list: [] };
            }
            const current = Array.isArray(state.posts.list) ? state.posts.list : []
            const incoming = Array.isArray(action.payload) ? action.payload : []
            state.posts.list = [...current, ...incoming]
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
        fetchPostsByUser: (state) => state,
        setProfilePosts: (state, action) => {
            if (!state.profilePosts || Array.isArray(state.profilePosts)) {
                state.profilePosts = { list: [] };
            }
            state.profilePosts.list = action.payload;
        },
        setProfileLoading: (state, action) => {
            state.profilePosts.loading = action.payload
        },
        setProfileError: (state, action) => {
            state.profilePosts.error = action.payload
        },
        setProfilePagination: (state, action) => {
            state.profilePosts.pagination = {
                ...state.profilePosts.pagination,
                ...action.payload
            };
        },
        setProfileUserId: (state, action) => {
            state.profilePosts.userId = action.payload
        },
        clearProfilePosts: (state) => {
            state.profilePosts.list = []
            state.profilePosts.loading = false
            state.profilePosts.error = null
            state.profilePosts.pagination = {
                page: 1,
                limit: 10,
                total: 0
            }
            state.profilePosts.userId = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            state.loading = false
            state.error = null
            state.createLoading = false
            state.createError = null
            state.createSuccess = false
            state.detailLoading = false
            state.detailError = null
            state.deleteLoading = false
            state.deleteError = null
            state.deletingPostId = null
        })
    }

})

export const {
    fetchPosts,
    setPosts,
    appendPosts,
    setPostDetail,
    setPagination,
    setLoading,
    setError,
    createPost,
    setCreateError,
    setCreateSuccess,
    setCreateLoading,
    fetchPostById,
    setDetailLoading,
    setDetailError,
    clearPostDetail,
    deletePost,
    setDeleteLoading,
    setDeleteError,
    setDeletingPostId,
    removePostFromList,
    fetchPostsByUser,
    setProfilePosts,
    setProfileLoading,
    setProfileError,
    setProfileUserId,
    clearProfilePosts,
    setProfilePagination
} = postsSlice.actions;


export default postsSlice.reducer;
