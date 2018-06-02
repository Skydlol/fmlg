import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor( private authenticationService: AuthenticationService, private router: Router ) { }

  canActivate(): boolean {
    if ( !this.authenticationService.isLoggedIn() ) {
      this.router.navigate(['/authentication/login']);
      return false;
    }

    if ( this.authenticationService.isExpired() ) {
      this.router.navigate(['/authentication/login']);
      return false;
    }

    return true;
  }
}
