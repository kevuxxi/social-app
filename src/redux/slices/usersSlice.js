import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess: (state, action) => {
            state.currentUser = action.payload ?? null;
            state.loading = false;
            state.error = null;
        },
        fetchUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetCurrentUser: (state) => {
            state.currentUser = null
            state.loading = false;
            state.error = null;
        }
    }

})

export const {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    resetCurrentUser
} = usersSlice.actions;

export default usersSlice.reducer;
