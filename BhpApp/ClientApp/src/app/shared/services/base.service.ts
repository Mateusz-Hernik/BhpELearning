import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {

    baseUrl = '';

    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor() { }

    protected handleError(error: any) {

        let errorMessage = '';

        if (error.error.errors && error.error.errors.length > 0) {
            errorMessage = error.error.errors[0];
        } else if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        return throwError(errorMessage);
    }
}
