import { all } from 'redux-saga/effects';
import { signupSaga } from './signupSaga';

export function* rootSaga() {
    yield all([
        signupSaga()
    ]);
}