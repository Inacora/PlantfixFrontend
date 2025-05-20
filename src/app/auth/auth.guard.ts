import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpTokenService } from '../services/auth/http-token.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenSvc = inject(HttpTokenService);
  const router = inject(Router);

  return tokenSvc.getCsrfToken().pipe(
    switchMap(() => 
      tokenSvc.getUser().pipe(
        map(user => {
          if (user) {
            return true;
          } else {
            router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          router.navigate(['/login']);
          return of(false);
        })
      )
    ),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
