import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logout,
    registerFailure,
    registerRequest,
    registerSuccess,
} from "../slices/authSlice";
import { registerUser, loginUser } from "../../api/authService";
import { jwtDecode } from "jwt-decode";

function* handleLogin(action) {
    try {
        const response = yield call(loginUser, action.payload);
        const { token } = response?.data ?? {}

        if (!token) throw new Error("No se recibió token desde el servidor");

        const decoded = jwtDecode(token);


        const user = {
            id: decoded.user?.user_id,
            username: decoded.user?.name,
            email: decoded.user?.email,
        };

        yield put(loginSuccess({ token, user }))

        if (token) {
            sessionStorage.setItem("token", token);
        }
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
        yield call([localStorage, 'removeItem'], "token");
        yield call([localStorage, 'removeItem'], "user");
    } catch (error) {
        yield put(loginFailure(error.message || "Error al intentar iniciar sesión"));
    }
}

function* handleRegister(action) {
    try {
        const response = yield call(registerUser, action.payload);
        const { token } = response?.data ?? {};

        if (!token) throw new Error("No se recibió token desde el servidor");

        const decoded = jwtDecode(token);
        const user = {
            id: decoded.user?.user_id,
            username: decoded.user?.name,
            email: decoded.user?.email,
        };

        if (token) {
            sessionStorage.setItem("token", token);
        }
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
        yield call([localStorage, 'removeItem'], "token");
        yield call([localStorage, 'removeItem'], "user");
        yield put(registerSuccess({ token, user }));
    } catch (error) {
        yield put(registerFailure(error.message || "Respuesta inválida del servidor"));
    }
}

function* handleLogout() {
    yield call([sessionStorage, 'removeItem'], "token");
    yield call([sessionStorage, 'removeItem'], "user");
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "user");
}

// Nuevo watcher
export function* watchLogout() {
    yield takeLatest(logout.type, handleLogout);
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
