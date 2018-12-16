import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from '../shared/services/user.service';
import { FormsModule, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { routing } from './account.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    SharedModule
  ],
  declarations: [ RegistrationComponent, LoginComponent ],
  providers: [ UserService ]
})
export class AccountModule { }
