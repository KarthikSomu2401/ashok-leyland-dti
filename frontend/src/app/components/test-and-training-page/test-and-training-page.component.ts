import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { FormService } from 'src/app/_services/form.service';
import { TestDetailsForm } from 'src/app/_models/test-details-form';

@Component({
  selector: 'app-test-and-training-page',
  templateUrl: './test-and-training-page.component.html',
  styleUrls: ['./test-and-training-page.component.css']
})
export class TestAndTrainingPageComponent implements OnInit {

  testDetails: TestDetailsForm | any;
  routeState: any;
  isDetailsFetched: Boolean = false;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private formService: FormService) {
    /* let nav: Navigation | any = this.router.getCurrentNavigation();

    if (nav.extras && nav.extras.state) {
      this.testDetails = nav.extras.state as TestDetailsForm;
    } */
  }

  ngOnInit(): void {
    this.formService.getTestDetails(this.activatedroute.snapshot.paramMap.get("id")!).subscribe((response) => {
      this.testDetails = response;
      this.isDetailsFetched = true;
    })
  }

}
