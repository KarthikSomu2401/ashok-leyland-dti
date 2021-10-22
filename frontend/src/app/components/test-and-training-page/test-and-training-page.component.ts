import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isPrintEnabled: Boolean = false;
  testStatus: TestStatus[] | any;
  isDetailsFetched: Boolean = false;
  sensorsCrossed: string | any;
  isCompleted: Boolean = false;
  isRemarked: Boolean = false;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private formService: FormService, private testStatusService: TestStatusService) {
  }
  intervalData: any;
  ngOnInit(): void {
    this.getUserDetails();
    this.intervalData =
      setInterval(() => {
        this.testStatusService.getTestStatus(this.testDetails.startDate).subscribe((response) => {
          this.sensorsCrossed = "LS " + response.map((sensor: { sensorId: any; }) => sensor.sensorId).join(",");
          if (response.length > 1 && response[response.length - 1].isLast) {
            this.testDetails.duration = new Date(response[response.length - 1].startDate).getTime() - new Date(response[0].startDate).getTime();
            this.testDetails.status = (response.length - 2) >= this.testDetails.sensorCount ? "Fail" : this.checkPercentage(this.testDetails.duration);
            if (this.testDetails.remarks !== undefined) {
              this.isRemarked = true;
            }
            this.isCompleted = true;
            if (this.testDetails.endDate === undefined) {
              this.formService.endTest(this.testDetails._id).subscribe(() => {
              })
            }
            this.isPrintEnabled = (this.testDetails.remarks !== undefined) ? true : false;
            //this.formService.updateTestDetails(this.activatedroute.snapshot.paramMap.get("id")!, this.testDetails);
            clearInterval(this.intervalData);
          } else {
            this.testDetails.duration = 0;
            if ((response.length - 2) >= this.testDetails.sensorCount) {
              this.testDetails.status = "Fail";
              this.isCompleted = true;
            } else {
              this.testDetails.status = "In Progress";
              this.isCompleted = false;
            }
            this.isPrintEnabled = false;
            this.isRemarked = false;
          }
        })
      }, 500);
  }

  checkSensorCountEligibility(): any {

  }

  getUserDetails(): void {
    this.formService.getTestDetails(this.activatedroute.snapshot.paramMap.get("id")!).subscribe((response) => {
      this.testDetails = response;
      this.isDetailsFetched = true;
    })
  }

  endTest(testId: string): void {
    this.formService.endTest(testId).subscribe((response) => {
      clearInterval(this.intervalData);
      this.testDetails.duration = new Date(response.endDate).getTime() - new Date(response.startDate).getTime();
      this.testDetails.status = this.sensorsCrossed.split(",").length() > this.testDetails.sensorCount ? "Fail" : this.checkPercentage(this.testDetails.duration);
      this.isCompleted = true;
    })
  }

  addRemarks(testId: string): void {
    this.formService.updateTestDetails(testId, this.testDetails).subscribe((response) => {
      this.isPrintEnabled = true;
      this.isRemarked = true;
    });
  }

  checkPercentage(currentTiming: number): string {
    let percentage = (currentTiming / 330000) * 100;
    let response = "Fail";
    if (percentage > 85 && percentage <= 100)
      response = "Slow Learner";
    else if (percentage > 70 && percentage <= 85)
      response = "Average";
    else if (percentage > 60 && percentage <= 70)
      response = "Good";
    else if (percentage >= 50 && percentage <= 60)
      response = "Excellent";
    else if (percentage < 50)
      response = "Over Speed";
    return response;
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
              width: 50%;
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
              width: 25%;
            }
            .pr-th {
              border: 1px solid black;
              width: 25%;
            }
            .heading {
              background-color: #b9bdba;
            }
            .excellent, .good {
              color: green!important;
            }
            .fail, .over_speed {
              color: red!important;
            }
            .average, .slow_learner {
              color: orange!important;
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
                <td><b>DL No :</b> ${toBePrinted.dlNo}</td><td></td>
              </tr>
              <tr>
                <td><b>Candidate Name :</b> ${toBePrinted.candidateName}</td><td></td>
              </tr>
              <tr>
                <td><b>Date of Test :</b> ${toBePrinted.dateOfTest}</td><td><b>Vehicle Type :</b> ${toBePrinted.vehicleType} (${toBePrinted.vehicleSubType})</td>
              </tr>
              <tr>
                <td><b>Trainer Name :</b> ${toBePrinted.trainerName}</td><td><b>Vehicle No :</b> ${toBePrinted.vehicleNumber}</td>
              </tr>
              <tr></tr>
              <tr>
                <td colspan="2"><b>Remarks :</b> ${toBePrinted.remarks}</td>
              </tr>
            </table>
            <br/><br/>
            <table class="pr-table">
                <thead>
                    <tr class="pr-tr">
                        <th class="pr-th heading">Test Name</th>
                        <th class="pr-th heading">Sensors Crossed</th>
                        <th class="pr-th heading">Duration</th>
                        <th class="pr-th heading">Marks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="pr-tr">
                        <td class="pr-td">8 Track</td>
                        <td class="pr-td">${this.sensorsCrossed}</td>
                        <td class="pr-td">${this.millisToMinutes(toBePrinted.duration)}</td>
                        <td class="pr-td ${toBePrinted.status.toLowerCase().split(" ").join("_")}">${toBePrinted.status}</td>
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
