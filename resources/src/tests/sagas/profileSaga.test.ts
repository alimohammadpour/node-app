import { call, Effect, put, takeLatest } from "redux-saga/effects";
import { getProfile, handleGetProfile, profileSaga } from "../../sagas/profileSaga";
import { getProfileFailure, getProfileRequest, getProfileSuccess } from "../../slices/profileSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetProfileRequestType, GetProfileSuccessType } from "../../types/ProfileType";
import { AxiosError, AxiosResponse } from "axios";

describe('profileSaga', () => {
  it('should be defined', () => expect(profileSaga).toBeDefined());

  it('should take latest', () => {
    const generator: Generator = profileSaga();

    const getProfileRequestEffect: Effect = takeLatest(
      getProfileRequest.type,
      handleGetProfile
    );

    expect(generator.next().value).toEqual(getProfileRequestEffect);
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  describe('handle get user profile request saga', () => {
    const payload: GetProfileRequestType = {
      userId: ''
    };
    const action: PayloadAction<GetProfileRequestType> = {
      type: getProfileRequest.type,
      payload
    }
    const generator: Generator = handleGetProfile(action);

    it('try', () => {
      const getProfileCallEffect: Effect = call(getProfile, payload);
      const data: GetProfileSuccessType = {
        progress: { level: 1, completion: '' },
      };
      const response: { data: GetProfileSuccessType } = { data };
      const getProfileSuccessPutEffect: Effect = put(getProfileSuccess(data));

      expect(generator.next().value).toEqual(getProfileCallEffect);
      expect(generator.next(response).value).toEqual(getProfileSuccessPutEffect);
    });

    it('catch', () => {
      const data: { error: string } = { error: '' };
      const getProfileFailurePutEffect: Effect = put(getProfileFailure(data));
      const error = { response: { data } as AxiosResponse } as AxiosError
      expect(generator.throw(error).value).toEqual(getProfileFailurePutEffect);
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});
