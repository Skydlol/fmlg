import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { environment as ENV } from "../../../environments/environment";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class DemasyRequestService {
  constructor(private http: HttpClient) {}

  getEmployees() {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http
      .get("http://" + ENV.path + "/bdd/employees", { headers: headers,  responseType: 'json' })
      .pipe(
        map(( response: HttpResponse<Response> ) => response ),
        catchError(( error: HttpErrorResponse ) => throwError(error))
      );
  }
}
