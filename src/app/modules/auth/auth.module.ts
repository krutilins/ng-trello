import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialAuthComponent } from './components/social-auth/social-auth.component';
import { VkAuthComponent } from './components/vk-auth/vk-auth.component';


@NgModule({
  declarations: [
    AuthPageComponent,
    SignInPageComponent,
    SignUpPageComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SocialAuthComponent,
    VkAuthComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
