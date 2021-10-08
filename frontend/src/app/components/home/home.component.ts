import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JsonFormData } from '../json-form/json-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public formData: JsonFormData | any;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http
      .get('/assets/my-form.json')
      .subscribe((formData: any) => {
        this.formData = formData;
      });
  }

}
