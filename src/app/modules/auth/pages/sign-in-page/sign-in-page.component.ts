import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent {

  public error: any;
  public signInFormGroup: FormGroup;

  constructor(
    private authService: FirebaseAuthService,
    private formBuilder: FormBuilder
  ) {
    this.signInFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    const email = this.signInFormGroup.get('email')?.value;
    const password = this.signInFormGroup.get('password')?.value;

    if (email && password) {
      this.authService.signIn(email, password)
    }

  }
}
