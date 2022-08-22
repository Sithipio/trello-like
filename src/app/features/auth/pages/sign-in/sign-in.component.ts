import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUser} from "@shared/interfaces/user.interface";
import {UsersService} from "@core/services/users.service";
import {Router} from "@angular/router";
import {AuthService} from "@core/auth/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: [
    '../../../../styles/auth.scss',
    './sign-in.component.scss'
  ]
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
              private usersService: UsersService,
              private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.inSignForm = this.fb.group({
      userEmail: [null, [Validators.required, Validators.email]],
      userPassword: [null, Validators.required],
    });
  }

  get emailForm(): AbstractControl {
    return this.inSignForm.get('userEmail');
  }

  get passwordForm(): AbstractControl {
    return this.inSignForm.get('userPassword');
  }

  checkForm(form: IUser): void {
    this.users = this.usersService.getUsers();
    this.isAlarmEmail = !this.users.find(user => user.userEmail === form.userEmail);
    this.isAlarmPass = !this.users.find(user => user.userPassword === form.userPassword);
  }

  signIn(): void {
    if (this.inSignForm.valid) {
      this.isAlarmForm = false;
      this.authService.signIn(this.inSignForm.value).subscribe({
        next: () => {
          this.router.navigate(["/border"]);
        },
        error: (error) => {

        }
      });
    } else {
      this.inSignForm.markAllAsTouched();
      this.isAlarmForm = true;
    }
  }
}
