import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthMethods } from '../models/auth-methods.model';
import { UserMetadata } from '../models/user-metadata.model';
import { UserState } from '../store/models/user-state.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userState$ = new BehaviorSubject<UserState | null>(null);
  private userLocalStorageKey = 'user';

  constructor(
    public firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.userState$.next(this.getUserFromLocalStorage());
  }

  public setUserData(userMetadata: UserMetadata, authMethod: AuthMethods, accessToken: string): Promise<UserState> {
    return this.firestore.collection<UserMetadata>('users').doc(userMetadata.id).get().toPromise().then(userDocSnapshot => {

      if (userDocSnapshot.exists) {
        userDocSnapshot.ref.update(userMetadata);
      } else {
        userDocSnapshot.ref.set({
          ...userMetadata
        });
      }

      const userState: UserState = {
        userMetadata,
        accessToken,
        authMethod
      };

      localStorage.setItem(this.userLocalStorageKey, JSON.stringify(userState));

      this.userState$.next(userState);

      return userState;

    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem(this.userLocalStorageKey);
    if (user) {
      return Boolean(JSON.parse(user));
    }
    return false;
  }

  public getUserFromLocalStorage(): UserState | null {
    const userJson = localStorage.getItem('user');

    return userJson && JSON.parse(userJson) ? JSON.parse(userJson) : null;
  }

  public signOut(): void {
    localStorage.removeItem(this.userLocalStorageKey);
    this.router.navigate(['auth', 'sign-in']);
  }

}
