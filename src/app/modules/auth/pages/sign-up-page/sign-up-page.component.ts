import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/core/services/firebase-auth.service';
import { ConfirmedValidator } from 'src/app/core/validators/confirm.validator';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpPageComponent {


  public error: any;
  public signUpFormGroup: FormGroup;

  constructor(
    private authService: FirebaseAuthService,
    private formBuilder: FormBuilder
  ) {
    this.signUpFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'passwordRepeat')
    })
  }

  public signUpGoogle(): void {
    this.authService.googleAuth()
  }

  public onSubmit(): void {
    const email = this.signUpFormGroup.get('email')?.value;
    const password = this.signUpFormGroup.get('password')?.value;

    if (email && password) {
      this.authService.signUp(email, password)
    }

  }

}
