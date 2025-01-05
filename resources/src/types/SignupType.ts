export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';

export type UserSignupRequestTypes = { 
    name: string; 
    email: string; 
    password: string 
};