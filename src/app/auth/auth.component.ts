import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authResponseData, AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoding: boolean = false;
  error: string = "";

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onsubmit(form: NgForm) {
    if (!form.valid) {

    }

    const email = form.value.email;
    const password = form.value.pass;
    let authob: Observable<authResponseData>;
    this.isLoding = true;
    if (this.isLoginMode) {
      authob = this.authService.Login(email, password);

    } else {
      authob = this.authService.signUp(email, password);
    }
    authob.subscribe(responseData => {
      console.log(responseData)
      this.isLoding = false;
      this.error = ""
      this.router.navigate(['/recipes'])
    },
      errorMessage => {
        console.log(errorMessage);
        this.isLoding = false;
        this.error = errorMessage;

      });
    form.reset();
  }
}
