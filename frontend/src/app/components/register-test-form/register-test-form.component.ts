import { Component, OnInit } from '@angular/core';

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
    this.formName = "Computer skill analysis form";
    this.isFormFetched = true;
  }

  startTest(): void {
  }
}
