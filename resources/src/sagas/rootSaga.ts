import { all } from 'redux-saga/effects';
import { signupSaga } from './signupSaga';
import { profileSaga } from './profileSaga';

export function* rootSaga() {
    yield all([
        signupSaga(),
        profileSaga(),
    ]);
}