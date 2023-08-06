import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MainResponse } from 'src/base/model/MainResponse.model';
import { environment } from 'src/environments/environment';
import { CacheModel } from '../models/CacheModel';
import { Login } from 'src/app/Shared/models/login.model';
import { Router } from '@angular/router';
import { RefreshTokenModel } from '../models/RefreshToken';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url;
  lang!: string;

  private currentUserSubject: BehaviorSubject<CacheModel>;
  public currentUser: CacheModel;

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.url = environment.baseUrl;
    let current = localStorage.getItem('currentUser');
    if (current) {
      this.currentUserSubject = new BehaviorSubject<CacheModel>(JSON.parse(current));
    }
    else this.currentUserSubject = new BehaviorSubject<CacheModel>(new CacheModel());

    this.currentUser = this.currentUserSubject.getValue();

  }

  getUrl(): string {
    return environment.baseUrl + 'User/';
  }

  login(body: Login): Observable<MainResponse<CacheModel>> {

    body.Password = this.decodeBase64(body.Password);
    return this.http.post<MainResponse<CacheModel>>(`${this.getUrl()}Login`, body)
      .pipe(map((data: MainResponse<CacheModel>) => {
        if (data.Code === 200) {
          localStorage.setItem('currentUser', JSON.stringify(data.Data));
          this.currentUserSubject.next(data.Data);
        }
        return data;
      },
      ));
  }

  decodeBase64(base64: string): string {
    const text = window.btoa(base64);
    return text;
  }


  public get currentUserValue() {
 
    let current = localStorage.getItem('currentUser');
    if (current)
      return JSON.parse(localStorage.getItem('currentUser') || '{}');
    else return undefined;
  }

  reFrechTocken(refreshToken: RefreshTokenModel): Observable<MainResponse<CacheModel>> {
    return this.http.post<MainResponse<CacheModel>>(`${this.getUrl()}RefreshToken`, { refreshToken })
      .pipe(map((data: MainResponse<CacheModel>) => {
        if (data.Code === 200) {
          localStorage.setItem('currentUser', JSON.stringify(data.Data));
          this.currentUserSubject.next(data.Data);
        }
        return data;
      },
        catchError(err => {
          this.router.navigate(['']);
          return throwError(err);
        })
      ));
  }
}
