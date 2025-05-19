import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errInteInterceptor: HttpInterceptorFn = (req, next) => {
 
  const router = inject(Router)
 
  return next(req).pipe(catchError ((err) => {
    if([401, 403].includes(err.status)){
    
    } 
    
    const error = err.error.status || err.statusText;

    return throwError(() => error);
  } ));
};
