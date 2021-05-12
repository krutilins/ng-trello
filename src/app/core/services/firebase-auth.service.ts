import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserMetadata } from '../models/user-metadata.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthMethods } from '../models/auth-methods.model';
import { UserState } from '../store/models/user-state.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public auth: AuthService
  ) {
    // tslint:disable-next-line: deprecation
    this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        const userMetadata = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        };

        this.auth.setUserData(userMetadata, AuthMethods.firebase, firebaseUser.refreshToken);
      }
    });
  }

  public signIn(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        if (result.user) {
          this.setUserData(result.user);
        } // TODO: add throw error in else block
      }).catch((error) => {
        window.alert(error.message); // TODO: delete alert method
      });
  }

  public signUp(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        if (result.user) {
          this.setUserData(result.user);
        } // TODO: add throw error in else block
      }).catch((error) => {
        window.alert(error.message); // TODO: delete alert method
      });
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  public forgotPassword(passwordResetEmail: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  public googleAuth(): Promise<void> {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  private authLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        if (result.user) {
          this.setUserData(result.user);
        } // TODO: add throw error in else block
      }).catch((error) => {
        window.alert(error); // TODO: delete alert
      });
  }

  public sendVerificationMail(): Promise<void> | undefined {
    return firebase.auth().currentUser?.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']); // TODO: change this part of code
      });
  }

  private setUserData(firebaseUser: firebase.User): Promise<UserState> {
    return this.auth.setUserData(this.getUserState(firebaseUser), AuthMethods.firebase, firebaseUser.refreshToken);
  }

  private getUserState(firebaseUser: firebase.User): UserMetadata {
    return {
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      id: firebaseUser.uid,
      photoURL: firebaseUser.photoURL
    };
  }
}
