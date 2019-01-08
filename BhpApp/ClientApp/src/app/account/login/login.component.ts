import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  error: string;
  loginForm: FormGroup;

  constructor(private _userService: UserService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.error = '';

    if (this.loginForm.valid) {
      this._userService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe((res: boolean)  => {
        if (res) {
          this._router.navigate(['/dashboard']);
        }
      },
      (err: string) => this.error = err);
    }
  }
}
