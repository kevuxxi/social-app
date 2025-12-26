import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    fetchPosts as fetchPostsAction,
    setError,
    setLoading,
    setPagination,
    setPostDetail,
    setPosts
} from "../slices/postsSlice";
import { getPosts } from "../../api/postsService";


export const FETCH_POST_BY_ID = "posts/fetchPostById";
export const CREATE_POST = "posts/createPost";
export const DELETE_POST = "posts/deletePost";



function* fetchPostsSaga(action) {
    yield put(setError(null))
    yield put(setLoading(true))
    try {
        const { posts, pagination } = yield call(getPosts, action.payload);
        yield put(setPosts(posts))
        yield put(setPagination(pagination))
    } catch (error) {
        yield put(setError(error.message || "No se pudieron obtener los posts"));
    }
    finally {
        yield put(setLoading(false))
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
    yield takeLatest(fetchPostsAction.type, fetchPostsSaga);
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
