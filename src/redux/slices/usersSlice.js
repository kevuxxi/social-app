import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
    profileUser: {
        data: null,
        loading: false,
        error: null,
    }
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
        },
        fetchProfileUser: (state) => state,
        setProfileUserLoading: (state, action) => {
            if (!state.profileUser) {
                state.profileUser = { data: null, loading: false, error: null };
            }
            state.profileUser.loading = action.payload;
        },
        setProfileUserData: (state, action) => {
            if (!state.profileUser) {
                state.profileUser = { data: null, loading: false, error: null };
            }
            state.profileUser.data = action.payload;
            state.profileUser.loading = false;
            state.profileUser.error = null;
        },
        setProfileUserError: (state, action) => {
            if (!state.profileUser) {
                state.profileUser = { data: null, loading: false, error: null };
            }
            state.profileUser.error = action.payload;
            state.profileUser.loading = false;
        },
        clearProfileUser: (state) => {
            if (!state.profileUser) {
                state.profileUser = { data: null, loading: false, error: null };
            }
            state.profileUser.data = null;
            state.profileUser.loading = false;
            state.profileUser.error = null;
        }
    }

})

export const {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
    resetCurrentUser,
    fetchProfileUser,
    setProfileUserLoading,
    setProfileUserData,
    setProfileUserError,
    clearProfileUser
} = usersSlice.actions;

export default usersSlice.reducer;
