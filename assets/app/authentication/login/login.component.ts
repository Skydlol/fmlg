import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error_message: string;

  constructor( private authenticationService: AuthenticationService, private router: Router ) {
    this.error_message = '';
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
          Validators.required
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
          this.error_message = '';
          this.router.navigateByUrl('/');
      },
      error => {
        this.error_message = error.error.message;
      }
  );
  this.loginForm.reset();
  }
}
