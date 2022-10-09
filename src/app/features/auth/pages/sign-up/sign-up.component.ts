import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';
import { NotificationType } from '@shared/enums';
import { NotificationService } from '@shared/services';
import { URL_SIGN_IN } from '@shared/constant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../../../../styles/_font-styles.scss',
    '../../styles/auth.scss',
    './sign-up.component.scss',
  ],
})
export class SignUpComponent implements OnInit {

  public upSignForm: FormGroup;
  public isHidePass: boolean = true;
  public isHidePassConf: boolean = true;
  public isAlarmForm: boolean = false;
  public urlToLog = URL_SIGN_IN;

  constructor(public fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
   this.createSignUpForm();
  }

  public createSignUpForm(): void {
    this.upSignForm = this.fb.group({
      'firstName': [null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,20}$/),
        Validators.minLength(2), Validators.maxLength(20)]],
      'lastName': [null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,20}$/),
        Validators.minLength(2), Validators.maxLength(20)]],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, control => this.validatePasswords(control, 'password1'),
        Validators.minLength(4)]],
      'confPassword': [null, [Validators.required, control => this.validatePasswords(control, 'password2')]],
    });
  }

  get firstNameForm(): AbstractControl {
    return this.upSignForm.get('firstName');
  }

  get lastNameForm(): AbstractControl {
    return this.upSignForm.get('lastName');
  }

  get emailForm(): AbstractControl {
    return this.upSignForm.get('email');
  }

  get passwordForm(): AbstractControl {
    return this.upSignForm.get('password');
  }

  get confPasswordForm(): AbstractControl {
    return this.upSignForm.get('confPassword');
  }

  public validatePasswords(control: AbstractControl, name: string): void {
    if (
      this.upSignForm === undefined ||
      this.passwordForm.value === '' ||
      this.confPasswordForm.value === ''
    ) {
      return null;
    } else if (this.passwordForm.value === this.confPasswordForm.value) {
      if (
        name === 'password1' &&
        this.confPasswordForm.hasError('passwordMismatch')
      ) {
        this.passwordForm.setErrors(null);
        this.confPasswordForm.updateValueAndValidity();
      } else if (
        name === 'password2' &&
        this.passwordForm.hasError('passwordMismatch')
      ) {
        this.confPasswordForm.setErrors(null);
        this.passwordForm.updateValueAndValidity();
      }
      return null;
    } else
      this.confPasswordForm.setErrors({ 'passwordMismatch': true });
  }

 public onSignUp(): void {
    this.passwordForm.updateValueAndValidity();
    if (this.upSignForm.invalid) {
      this.upSignForm.markAllAsTouched();
      this.isAlarmForm = true;
    } else if (this.upSignForm.valid) {
      this.isAlarmForm = false;
      this.authService.signUp(this.upSignForm.value).subscribe({
        next: () => {
          this.router.navigate([URL_SIGN_IN]);
        },
        error: ({ error }) => {
          this.notificationService.sendMessage({
            title: error.error,
            message: error.message,
            type: NotificationType.ERROR,
          });
          if (error.statusCode === 409) {
            this.emailForm.setErrors({ emailExist: true });
            this.isAlarmForm = true;
          }
        },
      });
    }
  }

}
