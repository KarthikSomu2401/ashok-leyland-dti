import { Component, OnInit } from '@angular/core';
import { JsonFormData } from '../json-form/json-form.component';
import { FormService } from "../../_services/form.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public formData: JsonFormData | any;
  public formName: any;
  isFormFetched = false;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.formService.getform("user_testing_form").subscribe(
      data => {
        this.formData = data?.formStructure;
        this.formName = data?.name;
        this.isFormFetched = true;
      },
      err => {
        this.isFormFetched = false;
      }
    );
  }

}
