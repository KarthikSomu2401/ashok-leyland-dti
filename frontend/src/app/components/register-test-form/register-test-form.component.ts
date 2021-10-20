import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/_services/form.service';

@Component({
  selector: 'app-register-test-form',
  templateUrl: './register-test-form.component.html',
  styleUrls: ['./register-test-form.component.css']
})
export class RegisterTestFormComponent implements OnInit {

  public formName: any;
  isFormFetched = false;

  constructor() { }

  ngOnInit() {
    this.formName = "user_testing_form";
    this.isFormFetched = true;
  }

  startTest(): void {
  }
}
