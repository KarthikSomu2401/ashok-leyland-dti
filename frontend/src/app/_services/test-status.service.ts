import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

const AUTH_API = environment.apiURL + "/test/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TestStatusService {

  constructor(private http: HttpClient) { }

  getTestStatus(dlNumber: String, attempt: Number): Observable<any> {
    return this.http.post(AUTH_API + 'testStatus', {
      dlNo: dlNumber,
      attempt: attempt
    }, httpOptions);
  }

}
