import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSignupRequestTypes } from "../types/SignupType";

export type UserSignupSuccessType = { id: string, message: string };

interface SignupState {
    pending: boolean;
    user: null | UserSignupSuccessType;
    error: null | string;
}

const initialState: SignupState = {
    pending: false,
    user: null,
    error: null,
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        userSignupRequest: (state, { payload }: PayloadAction<UserSignupRequestTypes>) => {
            state.pending = true
        },
        userSignupSuccess: (state, { payload }: PayloadAction<UserSignupSuccessType>) => {
            state.pending = false;
            state.user = payload;
        },
        userSignupFailure: (state, { payload: { error } }: PayloadAction<{error: string}>) => {
            state.pending = false;
            state.error = error;
        }
    }
});

export const { userSignupRequest, userSignupSuccess, userSignupFailure } = signupSlice.actions;

export default signupSlice.reducer;