import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure, resetCurrentUser } from "../slices/usersSlice";
import { getUserById } from "../../api/usersService";
import { logout } from "../slices/authSlice";

function* handleGetUserById(action) {
    try {
        const { data } = yield call(getUserById, action.payload);
        yield put(fetchUserSuccess(data));
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