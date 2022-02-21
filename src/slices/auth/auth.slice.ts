import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: { accessToken: null, refreshToken: null } as AuthState,
    reducers: {
        setCredentials: (
            state,
            { payload: { accessToken, refreshToken } }: PayloadAction<{ accessToken: string; refreshToken: string }>
        ) => {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
    },
});

export const { setCredentials } = authSlice.actions;
