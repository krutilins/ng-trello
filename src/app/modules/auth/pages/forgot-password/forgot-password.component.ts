import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: FirebaseAuthService
  ) { }

  ngOnInit(): void {
  }

}
