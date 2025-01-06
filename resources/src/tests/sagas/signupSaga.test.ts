import { call, Effect, put, takeLatest } from "redux-saga/effects";
import { createUser, handleUserSignup, signupSaga } from "../../sagas/signupSaga";
import { userSignupFailure, userSignupRequest, userSignupSuccess, UserSignupSuccessType } from "../../slices/signupSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserSignupRequestTypes } from "../../types/SignupType";
import { AxiosError, AxiosResponse } from "axios";

describe('signupSaga', () => {
  it('should be defined', () => expect(signupSaga).toBeDefined());

  it('should take latest', () => {
    const generator: Generator = signupSaga();

    const userSignupRequestEffect: Effect = takeLatest(
      userSignupRequest.type,
      handleUserSignup
    );

    expect(generator.next().value).toEqual(userSignupRequestEffect);
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  describe('handle user signup request saga', () => {
    const payload: UserSignupRequestTypes = {
      name    : '',
      email   : '',
      password: ''
    };
    const action: PayloadAction<UserSignupRequestTypes> = {
      type: userSignupRequest.type,
      payload
    }
    const generator: Generator = handleUserSignup(action);

    it('try', () => {
      const createUserCallEffect: Effect = call(createUser, payload);
      const data: UserSignupSuccessType = {
        id: '',
        message: ''
      };
      const response: { data: UserSignupSuccessType } = { data };
      const userSignupSuccessPutEffect: Effect = put(userSignupSuccess(data));

      expect(generator.next().value).toEqual(createUserCallEffect);
      expect(generator.next(response).value).toEqual(userSignupSuccessPutEffect);
    });

    it('catch', () => {
      const data: { error: string } = { error: '' };
      const userSignupFailurePutEffect: Effect = put(userSignupFailure(data));
      const error = { response: { data } as AxiosResponse } as AxiosError
      expect(generator.throw(error).value).toEqual(userSignupFailurePutEffect);
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});
