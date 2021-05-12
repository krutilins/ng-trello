import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';
import { UserMetadata } from 'src/app/core/models/user-metadata.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailComponent {

  public userMetadata: Observable<UserMetadata | null> = this.store.select(selectUserMetadata);

  constructor(
    private store: Store<AppState>,
    private firebaseAuthService: FirebaseAuthService,
  ) { }

  public onSendVerificationEmail(): void {
    this.firebaseAuthService.sendVerificationMail();
  }
}
