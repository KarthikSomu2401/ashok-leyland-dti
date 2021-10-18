import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public formName: any;
  isFormFetched = false;

  constructor() { }

  ngOnInit() {
    this.formName = "user_testing_form";
    this.isFormFetched = true;
  }

}
 