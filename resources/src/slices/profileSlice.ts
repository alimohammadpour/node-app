import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetProfileRequestType, GetProfileSuccessType } from "../types/ProfileType";

export interface ProfileState {
    pending: boolean;
    profile: null | GetProfileSuccessType;
    error: null | string;
}

export const initialState: ProfileState = {
    pending: false,
    profile: null,
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfileRequest: (state, { payload }: PayloadAction<GetProfileRequestType>) => {
            state.pending = true
        },
        getProfileSuccess: (state, { payload }: PayloadAction<GetProfileSuccessType>) => {
            state.pending = false;
            state.profile = payload;
        },
        getProfileFailure: (state, { payload: { error } }: PayloadAction<{error: string}>) => {
            state.pending = false;
            state.error = error;
        }
    }
});

export const { getProfileRequest, getProfileSuccess, getProfileFailure } = profileSlice.actions;

export default profileSlice.reducer;