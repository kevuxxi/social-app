import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { setError, setLoading, setPagination, setPostDetail, setPosts } from "../slices/postsSlice";
import { getPosts } from "../../api/postsService";


export const FETCH_POSTS = "posts/fetchPosts";
export const FETCH_POST_BY_ID = "posts/fetchPostById";
export const CREATE_POST = "posts/createPost";
export const DELETE_POST = "posts/deletePost";



function* fetchPosts(action) {

    yield put(setLoading(true))
    try {
        const response = yield call(getPosts, action.payload);
        const posts = response?.data.data ?? []
        const pagination = response?.data?.pagination ?? {}
        /*   const posts = {
              id: postsData.post_id,
              userid: postsData.user_id,
              post: postsData.content,
              image: postsData.image_url,
              createdAt: postsData.created_at,
              modifiedAt: postsData.modified_at
          } */
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
