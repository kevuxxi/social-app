import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    resetCurrentUser,
    fetchProfileUser,
    setProfileUserLoading,
    setProfileUserData,
    setProfileUserError
} from "../slices/usersSlice";
import { getUserById } from "../../api/usersService";
import { logout } from "../slices/authSlice";

function* handleGetUserById(action) {
    try {
        const response = yield call(getUserById, action.payload);

        const userData = response.data.data;

        const user = {
            id: userData.user_id,
            username: userData.user_name,
            email: userData.email,
            createdAt: userData.created_at,
        };


        yield put(fetchUserSuccess(user));
    } catch (error) {
        yield put(fetchUserFailure(error.message || "No se pudieron obtener al usuario"));
    }
}

function* handleResetUser() {
    yield put(resetCurrentUser());
}

function* handleFetchProfileUser(action) {
    yield put(setProfileUserLoading(true));
    yield put(setProfileUserError(null));
    try {
        const userId = action.payload;
        const response = yield call(getUserById, userId);

        const userData = response.data.data;

        const user = {
            id: userData.user_id,
            username: userData.user_name,
            email: userData.email,
            createdAt: userData.created_at,
        };

        yield put(setProfileUserData(user));
    } catch (error) {
        yield put(setProfileUserError(error.message || "No se pudo obtener el usuario"));
    } finally {
        yield put(setProfileUserLoading(false));
    }
}

export function* watchUsers() {
    yield takeLatest(fetchUserRequest.type, handleGetUserById)
}

export function* watchResetUser() {
    yield takeLatest(logout.type, handleResetUser)
}

export function* watchFetchProfileUser() {
    yield takeLatest(fetchProfileUser.type, handleFetchProfileUser)
}

export default function* usersSaga() {
    yield all([fork(watchUsers), fork(watchResetUser), fork(watchFetchProfileUser)])
}