import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['dashboard']);
    }
  }

  redirectToSignIn(): void {
    this.router.navigate(['auth/sign-in']);
  }

  redirectToSignUp(): void {
    this.router.navigate(['auth/sign-up']);
  }

  redirectToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

}
