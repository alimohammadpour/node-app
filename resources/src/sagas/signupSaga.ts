import { takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { USER_SIGNUP_REQUEST, UserSignupRequestTypes } from "../types/SignupType";

export function* handleUserSignup(action: PayloadAction<UserSignupRequestTypes>): Generator {

}

export function* signupSaga() {
    yield takeLatest(USER_SIGNUP_REQUEST, handleUserSignup);
}