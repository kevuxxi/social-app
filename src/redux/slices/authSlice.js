import { createSlice } from "@reduxjs/toolkit";

const initialState = (() => {
    let token = null
    let user = null
    try {
        token = sessionStorage.getItem("token")
        const rawUser = sessionStorage.getItem("user")
        user = rawUser ? JSON.parse(rawUser) : null
    } catch {
        token = null
        user = null
    }
    return {
        user,
        token,
        loading: false,
        error: null
    }
})()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        loginRequest: (state) => {
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action) => {
            const { token, user } = action.payload || {}
            state.loading = false
            state.error = null
            state.token = token ?? null
            state.user = user ?? null
        },

        loginFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.token = null
            state.user = null
        },
        registerRequest: (state) => {
            state.loading = true
            state.error = null
        },
        registerSuccess: (state, action) => {
            const { token, user } = action.payload || {}
            state.loading = false
            state.error = null
            state.token = token ?? null
            state.user = user ?? null
        },

        registerFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.token = null
            state.user = null
        },
        logout: (state) => {
            state.loading = false
            state.error = null
            state.token = null
            state.user = null
        },
    }
})

export const { registerFailure, registerRequest, registerSuccess, logout, loginFailure, loginRequest, loginSuccess } = authSlice.actions

export default authSlice.reducer
