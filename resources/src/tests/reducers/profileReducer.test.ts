import profileReducer, { 
    getProfileFailure, 
    getProfileRequest, 
    getProfileSuccess, 
    initialState, 
    ProfileState 
} from '../../slices/profileSlice';
import { GetProfileRequestType, GetProfileSuccessType } from '../../types/ProfileType';

describe('profileReducer', () => {
    it('should be defined', () => expect(profileReducer).toBeDefined());
  
    it("should return the initial state", () => {
        expect(profileReducer(undefined, { type: ''})).toEqual(initialState);
    });

    it('get user profile request', () => {
        const requestValues: GetProfileRequestType = {
            userId: ''
        };
        const requestState = profileReducer(initialState, getProfileRequest(requestValues));
        const expectedState: ProfileState = {
            pending: true,
            profile: null,
            error: null
        };
        expect(requestState).toEqual(expectedState);
    });

    it('get user profile success', () => {
        const successValues: GetProfileSuccessType = {
            progress: {
                level: 1,
                completion: '10%',
            }
        };
        const successState = profileReducer(initialState, getProfileSuccess(successValues));
        const expectedState: ProfileState = {
            pending: false,
            profile: successValues,
            error: null
        };
        expect(successState).toEqual(expectedState);
    });


    it('get user profile failure', () => {
        const failureValues = { error: '' };
        const failureState = profileReducer(initialState, getProfileFailure(failureValues));
        const expectedState: ProfileState = {
            pending: false,
            profile: null,
            error: ''
        };
        expect(failureState).toEqual(expectedState);
    });
  });
  