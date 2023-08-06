import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../Shared/models/login.model';
import { AuthenticationService } from '../Shared/service/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';
  loggedUser: Login = new Login();
  serverError: boolean = false;
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private router: Router, private authService: AuthenticationService,) {
  }
  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (currentUser != null && currentUser != undefined) {
      this.router.navigate(['/product/view-product']);
    }
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required,Validators.pattern("^[A-Za-z][a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      Password: new FormControl('', [Validators.required])
    });
  }


  login() {
    this.serverError = false;
    this.isSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(res => {
      this.router.navigateByUrl('/product/view-product');
    }, error => {
      this.serverError = true;
    });
  }

}
