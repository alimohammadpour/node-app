import signupReducer, { 
    initialState, 
    SignupState, 
    userSignupFailure, 
    userSignupRequest, 
    userSignupSuccess, 
    UserSignupSuccessType 
} from "../../slices/signupSlice";
import { UserSignupRequestTypes } from "../../types/SignupType";

describe('signupReducer', () => {
    it('should be defined', () => expect(signupReducer).toBeDefined());
  
    it("should return the initial state", () => {
        expect(signupReducer(undefined, { type: ''})).toEqual(initialState);
    });

    it('user signup request', () => {
        const requestValues: UserSignupRequestTypes = {
            name: 'name',
            email: 'mail@mail.com',
            password: 'password',
        };
        const requestState = signupReducer(initialState, userSignupRequest(requestValues));
        const expectedState: SignupState = {
            pending: true,
            user: null,
            error: null
        };
        expect(requestState).toEqual(expectedState);
    });

    it('user signup success', () => {
        const successValues: UserSignupSuccessType = {
            id: '',
            message: '',
        };
        const successState = signupReducer(initialState, userSignupSuccess(successValues));
        const expectedState: SignupState = {
            pending: false,
            user: successValues,
            error: null
        };
        expect(successState).toEqual(expectedState);
    });


    it('user signup failure', () => {
        const failureValues = { error: '' };
        const failureState = signupReducer(initialState, userSignupFailure(failureValues));
        const expectedState: SignupState = {
            pending: false,
            user: null,
            error: ''
        };
        expect(failureState).toEqual(expectedState);
    });
  });
  