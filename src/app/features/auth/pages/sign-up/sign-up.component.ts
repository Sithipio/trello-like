import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@shared/services';
import { URL_SIGN_IN } from '@shared/constant';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public upSignForm: FormGroup;
  public isHidePass: boolean = true;
  public isHidePassConf: boolean = true;
  public isAlarmForm: boolean = false;
  public urlToLog = URL_SIGN_IN;

  constructor(private fb: FormBuilder,
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

  get firstNameControl(): AbstractControl {
    return this.upSignForm.get('firstName');
  }

  get lastNameControl(): AbstractControl {
    return this.upSignForm.get('lastName');
  }

  get emailControl(): AbstractControl {
    return this.upSignForm.get('email');
  }

  get passwordControl(): AbstractControl {
    return this.upSignForm.get('password');
  }

  get confPasswordControl(): AbstractControl {
    return this.upSignForm.get('confPassword');
  }

  public validatePasswords(control: AbstractControl, name: string): void {
    if (
      this.upSignForm === undefined ||
      this.passwordControl.value === '' ||
      this.confPasswordControl.value === ''
    ) {
      return null;
    } else if (this.passwordControl.value === this.confPasswordControl.value) {
      if (
        name === 'password1' &&
        this.confPasswordControl.hasError('passwordMismatch')
      ) {
        this.passwordControl.setErrors(null);
        this.confPasswordControl.updateValueAndValidity();
      } else if (
        name === 'password2' &&
        this.passwordControl.hasError('passwordMismatch')
      ) {
        this.confPasswordControl.setErrors(null);
        this.passwordControl.updateValueAndValidity();
      }
      return null;
    } else
      this.confPasswordControl.setErrors({ 'passwordMismatch': true });
  }

  public onSignUp(): void {
    this.passwordControl.updateValueAndValidity();
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
          this.notificationService.sendMessages(error);
          if (error.statusCode === 409) {
            this.emailControl.setErrors({ emailExist: true });
            this.isAlarmForm = true;
          }
        },
      });
    }
  }

}
