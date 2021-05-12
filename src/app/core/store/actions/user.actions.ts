import { createAction, props } from '@ngrx/store';
import { UserState } from '../models/user-state.model';

export const userLoad = createAction(
  '[User] User Load'
);

export const userLoadSuccess = createAction(
  '[User API] User Load Success',
  props<{ userState: UserState }>()
);

export const userLoadFailed = createAction(
  '[User APi] User Load Failed',
  props<{ errorMessage: string }>()
);

export const userSignInVk = createAction(
  '[User] User Sign In Vk',
  props<{ id: string, email: string, accessToken: string }>()
);

export const userSignInSuccess = createAction(
  '[User API] User Sign In Success',
  props<{ userState: UserState }>()
);

export const userSignInFailed = createAction(
  '[User API] User Sign In Failed',
  props<{ errorMessage: string }>()
);

export const userSignOut = createAction(
  '[User] User Sign Out'
);

export const userSignOutSuccess = createAction(
  '[User] User Sign Out Success'
);

export const userSignOutFailed = createAction(
  '[User] User Sign Out Failed',
  props<{ errorMessage: string }>()
);
