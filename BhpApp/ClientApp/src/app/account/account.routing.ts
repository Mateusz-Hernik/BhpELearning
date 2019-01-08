import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
]);
