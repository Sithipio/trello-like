import {Component, OnInit} from '@angular/core';
import {IUser} from '@shared/interfaces/user.interface';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@core/auth/auth.service';
import {NotificationType} from '@shared/enums/notification';
import {NotificationService} from '@shared/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../../../../styles/auth.scss',
    './sign-up.component.scss',
  ],
})

export class SignUpComponent implements OnInit {

  public users: IUser[] = [];
  public upSignForm: FormGroup;
  public isHidePass: boolean = true;
  public isHidePassConf: boolean = true;
  public isAlarmForm: boolean = false;
  public isAlarmPass: boolean = false;

  constructor(public fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.upSignForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,20}$/), Validators.minLength(2), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]{2,20}$/), Validators.minLength(2), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, control => this.validatePasswords(control, 'password1'), Validators.minLength(4)]],
      confPassword: [null, [Validators.required, control => this.validatePasswords(control, 'password2')]],

    })
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

  get passwordConfForm(): AbstractControl {
    return this.upSignForm.get('confPassword');
  }

  validatePasswords(control: AbstractControl, name: string) {
    if (
      this.upSignForm === undefined ||
      this.passwordForm.value === '' ||
      this.passwordConfForm.value === ''
    ) {
      return null;
    } else if (this.passwordForm.value === this.passwordConfForm.value) {
      if (
        name === 'userPassword' &&
        this.passwordConfForm.hasError('passwordMismatch')
      ) {
        this.passwordForm.setErrors(null);
        this.passwordConfForm.updateValueAndValidity();
      } else if (
        name === 'userConfPassword' &&
        this.passwordForm.hasError('passwordMismatch')
      ) {
        this.passwordConfForm.setErrors(null);
        this.passwordForm.updateValueAndValidity();
      }
      this.isAlarmPass = false;
    } else
      this.isAlarmPass = true;
  }

  signUp(): void {
    if (this.isAlarmPass) {
      this.passwordConfForm.setErrors({'incorrect': true});
      this.passwordForm.updateValueAndValidity();
    }
    if (this.upSignForm.invalid) {
      this.upSignForm.markAllAsTouched();
      this.isAlarmForm = true;
    } else if (this.upSignForm.valid) {
      this.isAlarmForm = false;
      this.authService.signUp(this.upSignForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/sing-in']);
        },
        error: (error) => {
          this.notificationService.sendMessage({
            //todo how can do it better? (without e.e.e)
            title: error.error.error,
            message: error.error.message,
            type: NotificationType.ERROR,
          });

          if (error.error.statusCode === 409) {
            this.emailForm.setErrors({emailExist: true});
          }
        },
      });
    }
  }

}
