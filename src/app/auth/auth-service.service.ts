import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

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
  user = new Subject<User>();



  constructor(private http: HttpClient) { }
  signUp(email: string, pass: string) {
    return this.http.post<authResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjx_oBPIJ3YuuhhNqn0LvyceIe_kOvz4Q',
      {
        email: email,
        password: pass,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError), tap(responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        })
      );
  }
  Login(email: string, pass: string) {
    return this.http.post<authResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjx_oBPIJ3YuuhhNqn0LvyceIe_kOvz4Q',
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(responseData => {
      this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
    })
    );

  }
  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expiretiondate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expiretiondate);
    this.user.next(user);

  }
  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'an unknown error';
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "this email already exit";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "invalid email";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "invalid password";
        break;

    }
    return throwError(errorMessage)
  }
}
