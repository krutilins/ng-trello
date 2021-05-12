import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { VKAuth } from '../../services/vk-auth.service';
import * as UserActions from '../actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {

  public loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userLoad),
      mergeMap(action => this.authService.userState$.pipe(
        map(userState => {
          if (userState) {
            return UserActions.userLoadSuccess({ userState });
          } else {
            return UserActions.userLoadFailed({ errorMessage: 'have no user' });
          }
        })
      ))
    );
  });

  public signOutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userSignOut),
      mergeMap(action => of(
        this.firebaseAuthService.signOut().then(
          () => this.authService.signOut()
        )
      ).pipe(
        map(() => UserActions.userSignOutSuccess())
      )),
      catchError(errorMessage => of(UserActions.userSignOutFailed({ errorMessage })))
    );
  });

  public signInVkUser$$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userSignInVk),
      mergeMap(action => {
        return this.vkAuth.setUserData(action.id, action.email, action.accessToken).then(
          (userState) => UserActions.userSignInSuccess({ userState })
        );
      }),
      catchError(errorMessage => of(UserActions.userSignInFailed({ errorMessage })))
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService,
    private vkAuth: VKAuth
  ) { }
}
