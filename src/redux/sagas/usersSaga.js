import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure, resetCurrentUser } from "../slices/usersSlice";
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

export function* watchUsers() {
    yield takeLatest(fetchUserRequest.type, handleGetUserById)
}

export function* watchResetUser() {
    yield takeLatest(logout.type, handleResetUser)
}

export default function* usersSaga() {
    yield all([fork(watchUsers), fork(watchResetUser)])
}