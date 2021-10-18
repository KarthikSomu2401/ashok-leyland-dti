import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FormService } from 'src/app/_services/form.service';
import { TestDetailsForm } from 'src/app/_models/test-details-form';
import { TestStatusService } from 'src/app/_services/test-status.service';
import { TestStatus } from 'src/app/_models/test-status';
import { faPrint } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-test-and-training-page',
  templateUrl: './test-and-training-page.component.html',
  styleUrls: ['./test-and-training-page.component.css']
})
export class TestAndTrainingPageComponent implements OnInit {

  testDetails: TestDetailsForm | any;
  routeState: any;
  faPrint = faPrint;
  testStatus: TestStatus[] | any;
  isDetailsFetched: Boolean = false;
  isPassed: Boolean = false;

  constructor(private activatedroute: ActivatedRoute, private formService: FormService, private testStatusService: TestStatusService) {
  }

  ngOnInit(): void {
    this.getUserDetails();
    interval(1000)
      .pipe(
        mergeMap(() => this.testStatusService.getTestStatus(this.testDetails.insertedDate))
      )
      .subscribe((data) => {
        if (data.length > 1 && data[data.length - 1].isLast) {
          this.testDetails.duration = new Date(data[data.length - 1].insertedDate).getTime() - new Date(data[0].insertedDate).getTime();
          this.testDetails.status = "Passed";
          this.isPassed = true;
        } else {
          this.testDetails.duration = 0;
          this.testDetails.status = "In Progress";
          this.isPassed = false;
        }
        this.testStatus = data;
      });
  }

  getUserDetails(): void {
    this.formService.getTestDetails(this.activatedroute.snapshot.paramMap.get("id")!).subscribe((response) => {
      this.testDetails = response;
      this.isDetailsFetched = true;
    })
  }

  print(toBePrinted: any): void {
    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            table {
              width: 90%;
              margin-left: 5%;
              margin-right: 5%;
            }
            th, td {
              width: 30%;
            }
            .pr-table {
              text-align: center;
              border: 1px solid black;
            }
            .pr-tr {
              border: 1px solid black;
            }
            .pr-td {
              border: 1px solid black;
            }
            .pr-th {
              border: 1px solid black;
            }
            .heading {
              background-color: #b9bdba;
            }
            .success {
              color: green!important;
            }
            .pr-image {
              margin-left: 5%;
              margin-right: 5%; 
              width: 90%;
            }
            h4 {
              padding-left: 5%;
            }
            .body-content {
              margin-left: 1.25%;
              margin-right: 1.25%;
              margin-top: 1.25%;
              margin-top: 1.25%;
              border: 1px solid black;
            }
            .pr-header-logo {
              width: 15%;
              height: 100px;
              display: inline-block;
            }
            .pr-header-company-logo {
              width: 20%;
              height: 100px;
              display: inline-block;
            }
            hr {
              border: 1px solid black;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
            <div class="body-content">
            <div style="width: 97.5%">
            <img src="../assets/images/logo.png" class="pr-header-logo"></img>
            <span style="width: 58.5%; display: inline-block; text-align: center; padding-left: 2%; padding-right: 2%"><p>Society of</p><h3>Ashok Leyland Driver Training Institute</h3><p>(A Joint Venture Between Trasnport Department, Government of Tamil Nadu & Ashok Leyland Ltd)</p></span>
            <img src="../assets/images/company_logo.png" class="pr-header-company-logo"></img>
            </div>
            <hr><br/><br/>
            <h4><u>PRACTICAL TEST</u></h4><br/><br/>
            <table style="text-align: left">
              <tr>
                <td><b>Registration No :</b> ${toBePrinted.registrationNo}</td><td></td>
              </tr>
              <tr>
                <td><b>Name :</b> ${toBePrinted.personName}</td><td></td>
              </tr>
              <tr>
                <td><b>Date of Test :</b> ${toBePrinted.dateOfTest}</td><td></td>
              </tr>
              <tr>
                <td><b>Instructor :</b> ${toBePrinted.instructorName}</td><td><b>Vehicle No :</b> ${toBePrinted.vehicleName}</td>
              </tr>
            </table>
            <br/><br/>
            <table class="pr-table">
                <thead>
                    <tr class="pr-tr">
                        <th class="pr-th heading">Test Name</th>
                        <th class="pr-th heading">Duration</th>
                        <th class="pr-th heading">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="pr-tr">
                        <td class="pr-td">8 Track</td>
                        <td class="pr-td success">${this.millisToMinutes(toBePrinted.duration)}</td>
                        <td class="pr-td success">${toBePrinted.status}</td>
                    </tr>
                </tbody>
            </table><br/><br/>
            <img src="../assets/images/sensor_details.jpg" class="pr-image"></img><br/><br/>
            </div>
        </body>
      </html>`
    );
    popupWin?.document.close();
  }

  millisToMinutes(millis: any) {
    if (millis > 0) {
      var minutes: number | any = Math.floor(millis / 60000);
      var seconds: number | any = ((millis % 60000) / 1000).toFixed(0);
      return `${minutes} minutes ${(seconds < 10 ? "0" : "")}${seconds} seconds`;
    } else {
      return 'In Progress';
    }
  }
}
