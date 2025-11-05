import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

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
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        },
    }
})

export const { registerFailure, registerRequest, registerSuccess, logout, loginFailure, loginRequest, loginSuccess } = authSlice.actions

export default authSlice.reducer
