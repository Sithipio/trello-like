import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@shared/services';
import { URL_MAIN, URL_SIGN_UP } from '@shared/constant';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  public inSignForm: FormGroup;
  public isHidePass: boolean = true;
  public isAlarmForm: boolean = false;
  public urlToReg = URL_SIGN_UP;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
   this.createSignInForm();
  }

  public createSignInForm(): void {
    this.inSignForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.required],
    });
  }


  get emailControl(): AbstractControl {
    return this.inSignForm.get('email');
  }

  get passwordControl(): AbstractControl {
    return this.inSignForm.get('password');
  }

  public onSignIn(): void {
    if (this.inSignForm.valid) {
      this.isAlarmForm = false;
      this.authService.signIn(this.inSignForm.value).subscribe({
        next: () => {
          this.router.navigate([URL_MAIN]);
        },
        error: ({ error }) => {
          this.notificationService.sendMessages(error);
        },
      });
    } else {
      this.inSignForm.markAllAsTouched();
      this.isAlarmForm = true;
    }
  }

}
