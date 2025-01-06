import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserSignupRequestTypes } from "../types/SignupType";
import { 
    userSignupFailure, 
    userSignupRequest, 
    userSignupSuccess, 
    UserSignupSuccessType 
} from "../slices/signupSlice";
import { api } from "../api";
import { AxiosError, AxiosResponse } from "axios";

export const createUser = (user: UserSignupRequestTypes) => api.post<UserSignupSuccessType>(`user`, user);

export function* handleUserSignup({ payload }: PayloadAction<UserSignupRequestTypes>): Generator {
    try {
        const { data } = (yield call(createUser, payload)) as AxiosResponse<UserSignupSuccessType>;
        yield put(userSignupSuccess(data));
    } catch (err: unknown) {
        const axiosError = err as AxiosError;
        const error = axiosError.response?.data as { error: string }
        yield put(userSignupFailure(error));
    }
}

export function* signupSaga() {
    yield takeLatest(userSignupRequest.type, handleUserSignup);
}