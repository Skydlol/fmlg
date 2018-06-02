import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { environment as ENV } from "../../../environments/environment";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from "ngx-cookie-service";
const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string) {
    const body = { username: username, password: password };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http
      .post("http://" + ENV.path + "/authentication/login", body, {
        headers: headers,  responseType: 'json'
      })
      .pipe(
        map(( response: HttpResponse<Response> ) => response ),
        catchError(( error: HttpErrorResponse ) => throwError(error))
      );
  }

  logout() {
    this.cookieService.delete("NJSSESSID", "/", ENV.path);
    this.cookieService.delete("AJSSESSID", "/", ENV.path);
  }

  isLoggedIn() {
    const node_cookie = this.cookieService.check("NJSSESSID");
    const angular_cookie = this.cookieService.check("AJSSESSID");

    return node_cookie && angular_cookie;
  }

  isExpired() {
    let response;
    try {
      const token = this.cookieService.get("AJSSESSID");
      response = jwtHelper.isTokenExpired(token);
    } catch (err) {
      response = true;
    }
    return response;
  }
}
