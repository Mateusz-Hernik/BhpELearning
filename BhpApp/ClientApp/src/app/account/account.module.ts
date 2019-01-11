import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from '../shared/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared.module';
import { routing } from './account.routing';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    SharedModule
  ],
  providers: [UserService]
})
export class AccountModule { }
