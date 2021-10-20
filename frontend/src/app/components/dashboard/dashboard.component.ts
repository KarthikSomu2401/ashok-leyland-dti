import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestDetailsForm } from 'src/app/_models/test-details-form';
import { FormService } from 'src/app/_services/form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  testDetails: TestDetailsForm[] | any;

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.formService.getAllTestDetails().subscribe((response) => {
      this.testDetails = response;
    });
  }

  startTest(testId: string): void {
    this.formService.startTest(testId).subscribe((response) => {
      this.router.navigate(['/detailpage', response._id]);
    });
  }


}
