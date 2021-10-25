import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/_services/form.service';
import { TestDetailsForm } from "../../_models/test-details-form";

@Component({
  selector: 'app-test-details-form',
  templateUrl: './test-details-form.component.html',
  styleUrls: ['./test-details-form.component.css']
})
export class TestDetailsFormComponent implements OnInit {

  @Input()
  formName: any;

  testDetails: TestDetailsForm = new TestDetailsForm();

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(e: Event): void {
    if (this.validate(e)) {
      this.formService.createTestDetailsForm(this.testDetails).subscribe(
        response => {
          /* this.router.navigateByUrl('/detailpage', {
            state: response
          }); */
          this.router.navigate(['/dashboard']);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  validate(event: Event): Boolean {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log(form);
      return false;
    }
    form.classList.add('was-validated');
    return true;
  }
}
