import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailComponent implements OnInit {

  public firebaseUser: firebase.User | null = null;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.authService.firebaseUserData.subscribe(firebaseUser => this.firebaseUser = firebaseUser);
  }

  onSendVerificationEmail(): void {
    this.authService.sendVerificationMail();
  }
}
