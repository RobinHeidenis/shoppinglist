import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Token = string | null;

interface AuthState {
    accessToken: Token;
    refreshToken: Token;
}

/* eslint-disable no-param-reassign */

export const authSlice = createSlice({
    name: "auth",
    initialState: { accessToken: null, refreshToken: null } as AuthState,
    reducers: {
        setCredentials: (state, { payload: { accessToken, refreshToken } }: PayloadAction<{ accessToken: Token; refreshToken: Token }>) => {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
    },
});

export const { setCredentials } = authSlice.actions;
