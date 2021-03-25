import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';


@NgModule({
  declarations: [
    AuthPageComponent,
    SignInPageComponent,
    SignUpPageComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
