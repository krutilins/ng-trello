import { createReducer, on } from '@ngrx/store';
import { userLoadFailed, userLoadSuccess, userSignInSuccess } from '../actions/user.actions';
import { UserState } from '../models/user-state.model';
const initialState: UserState = {
  userMetadata: null,
  accessToken: null,
  authMethod: null
};

export const userReducer = createReducer(
  initialState,
  on(userLoadSuccess, (state, { userState }) => ({
    ...userState
  })),
  on(userLoadFailed, (state, { errorMessage }) => ({
    ...state
  })),
  on(userSignInSuccess, (state, { userState }) => ({
    ...userState
  }))
);
