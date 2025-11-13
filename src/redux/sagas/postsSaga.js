import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { setError, setLoading, setPagination, setPostDetail, setPosts } from "../slices/postsSlice";


export const FETCH_POSTS = "posts/fetchPosts";
export const FETCH_POST_BY_ID = "posts/fetchPostById";
export const CREATE_POST = "posts/createPost";
export const DELETE_POST = "posts/deletePost";



function* fetchPosts(action) {
    try {

    } catch (error) {

    }
}

function* fetchPostById(action) {
    try {

    } catch (error) {

    }
}

function* createPost(action) {
    try {

    } catch (error) {

    }
}

function* deletePost(action) {
    try {

    } catch (error) {

    }
}


function* watchFetchPosts() {
    yield takeLatest(FETCH_POSTS, fetchPosts);
}

function* watchFetchPostById() {
    yield takeLatest(FETCH_POST_BY_ID, fetchPostById);
}

function* watchCreatePost() {
    yield takeLatest(CREATE_POST, createPost);
}

function* watchDeletePost() {
    yield takeLatest(DELETE_POST, deletePost);
}

export default function* postsSaga() {
    yield all([
        watchFetchPosts(),
        watchFetchPostById(),
        watchCreatePost(),
        watchDeletePost()
    ]);
}
