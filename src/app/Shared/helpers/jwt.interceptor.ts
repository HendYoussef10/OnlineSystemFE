import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/Shared/service/authentication.service';
import { Router } from '@angular/router';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
          private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.Token;
    const isApiUrl = request.url.startsWith(environment.baseUrl);

    if (isLoggedIn && isApiUrl) {
      
      let jwt = currentUser.Token;
      if(!!jwt){

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
     }
    }

    else if(isLoggedIn === null || isLoggedIn === undefined)
    {
      this.router.navigate([''], { queryParams: { returnUrl: this.router.routerState.snapshot }});
     }

    return next.handle(request).pipe(
      tap(event => {
        
      })
    );
  }
}
