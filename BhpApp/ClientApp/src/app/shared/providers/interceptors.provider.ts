/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticateInterceptor } from '../interceptors/authenticate.interceptor';
import { LoaderInterceptor } from '../interceptors/loader.interceptor';
import { HttpErrorInterceptor } from '../interceptors/http-error.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];
