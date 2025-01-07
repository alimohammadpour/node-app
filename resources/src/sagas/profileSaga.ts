import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { AxiosError, AxiosResponse } from "axios";
import { getProfileFailure, getProfileRequest, getProfileSuccess } from "../slices/profileSlice";
import { GetProfileRequestType, GetProfileSuccessType } from "../types/ProfileType";

export const getProfile = ({ userId }: GetProfileRequestType) => 
    api.get<GetProfileSuccessType>(`/user/${userId}/progress/`);

export function* handleGetProfile({ payload }: PayloadAction<GetProfileRequestType>): Generator {
    try {
        const { data } = (yield call(getProfile, payload)) as AxiosResponse<GetProfileSuccessType>;
        yield put(getProfileSuccess(data));
    } catch (err: unknown) {
        const axiosError = err as AxiosError;
        const error = axiosError.response?.data as { error: string }
        yield put(getProfileFailure(error));
    }
}

export function* profileSaga() {
    yield takeLatest(getProfileRequest.type, handleGetProfile);
}