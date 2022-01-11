import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface authResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user = new BehaviorSubject<User | null>(null);
  expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }
  signUp(email: string, pass: string) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjx_oBPIJ3YuuhhNqn0LvyceIe_kOvz4Q',
        {
          email: email,
          password: pass,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  autoLogin() {
    console.log(localStorage.getItem('userData') ? localStorage.getItem('userData') : "kk")
    const data = localStorage.getItem('userData');
    if (typeof (data) === 'string') {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpireDate: string
      } = JSON.parse(data);
      if (!userData) {
        return;
      }
      const loadUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpireDate));

      if (loadUser.token) {
        this.user.next(loadUser);
        const expduration = new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
        this.autoLogout(expduration)
      }
    }



  }
  Login(email: string, pass: string) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjx_oBPIJ3YuuhhNqn0LvyceIe_kOvz4Q',
        {
          email: email,
          password: pass,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }
  autoLogout(expire: number) {
    this.expirationTimer = setTimeout(() => {
      this.Logout();
    }, expire);
  }
  Logout() {
    this.user.next(null)
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData')
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
  }
  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expiretiondate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expiretiondate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }
  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'an unknown error';
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email already exit';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'invalid email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'invalid password';
        break;
    }
    return throwError(errorMessage);
  }
}
