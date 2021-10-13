import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { TestDetailsForm } from '../_models/test-details-form';

const AUTH_API = environment.apiURL + "/form/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getform(formname: string): Observable<any> {
    return this.http.post(AUTH_API + 'getform', {
      formname
    }, httpOptions);
    //return this.http.get('/assets/my-form.json', httpOptions);
  }

  createTestDetailsForm(testDetails: TestDetailsForm): Observable<any> {
    return this.http.post(AUTH_API + 'createUserTestDetails', {
      testDetails
    }, httpOptions);
  }

  getTestDetails(testId: string): Observable<any> {
    return this.http.get(AUTH_API + 'getTestDetails/' + testId , httpOptions);
  }

}
