import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistration } from '../../shared/models/user.registration.interface';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  errors: string;
  registerForm: FormGroup;

  constructor(private _userService: UserService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)]
      ],
      surname: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(70)]
      ],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(30)]
      ],
      password: ['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
      ],
      confirmPassword: ['', [
        Validators.required,
        this.compareValidator('password')]
      ]
    });
  }

  compareValidator(controlNameToCompare: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const controlToCompare = c.root.get(controlNameToCompare);
        if (controlToCompare) {
          const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
            c.updateValueAndValidity();
            subscription.unsubscribe();
          });
        }

        return controlToCompare && controlToCompare.value !== c.value ? { 'compare': true } : null;
    };
  }

  registerUser() {
    this.errors = '';

    if (this.registerForm.valid) {
      this._userService.register(
        this.registerForm.controls.name.value,
        this.registerForm.controls.surname.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value)
        .subscribe(result  => {
          if (result) {
            this._router.navigate(['/login']);
          }},
          errors =>  this.errors = errors
        );
    }
  }
}
