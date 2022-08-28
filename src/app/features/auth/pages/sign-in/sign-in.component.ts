import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '@shared/interfaces/user.interface';
import {Router} from '@angular/router';
import {AuthService} from '@core/auth/auth.service';
import {NotificationService} from '@shared/services/notification.service';
import {NotificationType} from '@shared/enums/notification';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [
    '../../../../styles/auth.scss',
    './sign-in.component.scss',
  ],
})

export class SignInComponent implements OnInit {

  public users: IUser[] = [];
  public inSignForm: FormGroup;
  public isHidePass: boolean = true;
  public isAlarmForm: boolean = false;
  public isAlarmEmail: boolean = false;
  public isAlarmPass: boolean = false;

  constructor(public fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.inSignForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  get emailForm(): AbstractControl {
    return this.inSignForm.get('email');
  }

  get passwordForm(): AbstractControl {
    return this.inSignForm.get('password');
  }

  signIn(): void {
    if (this.inSignForm.valid) {
      this.isAlarmForm = false;
      this.authService.signIn(this.inSignForm.value).subscribe({
        next: () => {
          this.router.navigate(['/border']);
        },
        error: (error) => {
          this.notificationService.sendMessage({
            //todo how can do it better? (without e.e.e)
            title: error.error.error,
            message: error.error.message,
            type: NotificationType.ERROR,
          })
        },
      });
    } else {
      this.inSignForm.markAllAsTouched();
      this.isAlarmForm = true;
    }
  }

}
