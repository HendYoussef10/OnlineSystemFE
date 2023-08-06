import { RefreshTokenModel } from './../models/RefreshToken';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Shared/service/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private authService: AuthenticationService) {
     }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

const headers = new Headers({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
});

request.headers.set('Access-Control-Allow-Origin:','*');
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {     
      if (err.status === 401) {
        var refreshTokenModel = new RefreshTokenModel(this.authService.currentUserValue.RefreshToken)
        this.authService.reFrechTocken(refreshTokenModel)
          .subscribe(p => {
          }, err=>{
            this.router.navigate(['']);
          }
          );
      } else if (err.status === 400 || err.status === 404) {

        //console.error(err.error.errors);

      } else if (err.status === 500) {


      } else if (err.status === 403) {


      } else if (err.status === 0) {
      }

      const errors = err.statusText;
      return throwError(err);
    }));
  }
}
