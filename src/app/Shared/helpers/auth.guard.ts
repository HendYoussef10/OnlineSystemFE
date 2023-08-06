import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userPages: string = '';
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const currentUser = localStorage.getItem('currentUser');;
    if ((currentUser === null || currentUser === undefined) && (state.url != '/')) {

      this.router.navigate(['']);
      return false;
    }
    let urlSegments: string[] = state.url.split('/');

    if (urlSegments.length >= 1 && urlSegments[1] == "") {
      if (currentUser != null && currentUser != undefined) {
        this.router.navigate(['/product/view-product']);
        return false;
      }
    }

    return true;
  }
}
