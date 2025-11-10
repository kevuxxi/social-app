import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    registerFailure,
    registerRequest,
    registerSuccess,
} from "../slices/authSlice";


function* handleLogin(action) {
    try {
        const response = yield call(action.payload);
        const { token, user } = response?.data ?? {}
        yield put(loginSuccess({ token, user }))

        if (token) {
            localStorage.setItem("token", token);
        }
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    } catch (error) {
        yield put(loginFailure(error.message || "Error al intentar iniciar sesión"));
    }
}

function* handleRegister(action) {
    try {
        const response = yield call(action.payload);
        const { token, user } = response?.data ?? {};

        if (token) {
            localStorage.setItem("token", token);
        }
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
        yield put(registerSuccess({ token, user }));
    } catch (error) {
        yield put(registerFailure(error.message || "Respuesta inválida del servidor"));
    }
}

function* handleLogout() {
    // 1. Efecto Secundario: Limpia localStorage
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "user");
    // Nota: El reducer de logout ya se encarga de limpiar el estado de Redux.
}

// Nuevo watcher
export function* watchLogout() {
    yield takeLatest('auth/logout', handleLogout); // o simplemente logout.type
}

export function* watchLogin() {
    yield takeLatest(loginRequest.type, handleLogin);
}

export function* watchRegister() {
    yield takeLatest(registerRequest.type, handleRegister);
}

export default function* authSaga() {
    yield all([fork(watchLogin), fork(watchRegister), fork(watchLogout)]);
}