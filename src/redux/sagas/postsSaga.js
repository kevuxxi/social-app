import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import {
    fetchPosts as fetchPostsAction,
    setError,
    setLoading,
    setPagination,
    createPost as createPostAction,
    setPosts,
    appendPosts,
    setCreateLoading,
    setCreateError,
    setCreateSuccess,
    fetchPosts,
    setDetailError,
    setDetailLoading,
    setPostDetail,
    fetchPostById as fetchPostByIdAction,
    setDeleteLoading,
    setDeleteError,
    setDeletingPostId,
    removePostFromList,
    deletePost as deletePostByID,
    fetchPostsByUser,
    setProfileError,
    setProfileLoading,
    setProfilePosts,
    setProfileUserId,
    setProfilePagination,
} from "../slices/postsSlice";
import { getPosts, createPost as createPostApi, getPostById, deletePost, getPostByUserId } from '../../api/postsService'

function* fetchPostsSaga(action) {
    yield put(setError(null))
    yield put(setLoading(true))
    try {
        const { posts, pagination } = yield call(getPosts, action.payload);
        const mode = action.payload?.mode ?? "replace"
        if (mode === "append") {
            yield put(appendPosts(posts))
        } else {
            yield put(setPosts(posts))
        }
        yield put(setPagination({ ...pagination, lastCount: posts.length }))
    } catch (error) {
        yield put(setError(error.message || "No se pudieron obtener los posts"));
        yield delay(4000)
        yield put(setError(null))
    }
    finally {
        yield put(setLoading(false))
    }
}

function* fetchPostById(action) {
    yield put(setDetailError(null))
    yield put(setDetailLoading(true))
    yield put(setPostDetail(null))
    try {
        const { id } = action.payload || {}
        if (!id) { yield put(setDetailError('Post id required')); return }

        const postById = yield call(getPostById, id)
        if (!postById) { yield put((setDetailError('Post not found'))); return }
        yield put(setPostDetail(postById))
    } catch (error) {
        yield put(setDetailError(error.message || "No se pudo obtener el posts"))
    } finally {
        yield put(setDetailLoading(false))
    }
}

function* workerFetchPostsByUser(action) {
    yield put(setProfileError(null))
    yield put(setProfileLoading(true))
    yield put(setProfilePosts([]))
    try {
        const { userid, options } = action.payload
        yield put(setProfileUserId(userid))

        if (!userid) { yield put(setProfileError('Post id required')); return }

        const { posts, pagination } = yield call(getPostByUserId, userid, options)

        if (!posts) { yield put((setProfileError('Posts not found'))); return }

        yield put(setProfilePosts(posts))
        yield put(setProfilePagination(pagination));
    } catch (error) {
        yield put(setProfileError(error.message || "No se pudo obtener los posts"))
    } finally {
        yield put(setProfileLoading(false))
    }
}


function* createPost(action) {
    yield put(setCreateError(null))
    yield put(setCreateSuccess(false))
    yield put(setCreateLoading(true))
    try {
        yield call(createPostApi, action.payload)
        yield put(setCreateSuccess(true))
        yield put(fetchPosts({ page: 1, limit: 10 }))
    } catch (error) {
        yield put(setCreateError(error.message || 'No se pudo crear el post'))
    } finally {
        yield put(setCreateLoading(false))
    }
}

function* WatchDeletePost(action) {
    yield put(setDeleteLoading(true))
    yield put(setDeleteError(null))
    try {
        const { id } = action.payload || {}
        yield put(setDeletingPostId(id))
        yield call(deletePost, id)
        yield put(removePostFromList(id))
    } catch (error) {
        yield put(setDeleteError(error.message || 'No se puede borrar el Post'))
    } finally {
        yield put(setDeleteLoading(false))
        yield put(setDeletingPostId(null))
    }
}

function* watchFetchPosts() {
    yield takeLatest(fetchPostsAction.type, fetchPostsSaga);
}

function* watchFetchPostById() {
    yield takeLatest(fetchPostByIdAction.type, fetchPostById);
}
function* watchFetchPostByUserId() {
    yield takeLatest(fetchPostsByUser.type, workerFetchPostsByUser);
}

function* watchCreatePost() {
    yield takeLatest(createPostAction.type, createPost)
}

function* watchDeletePost() {
    yield takeLatest(deletePostByID.type, WatchDeletePost);
}

export default function* postsSaga() {
    yield all([
        watchFetchPosts(),
        watchFetchPostById(),
        watchCreatePost(),
        watchDeletePost(),
        watchFetchPostByUserId()
    ]);
}
