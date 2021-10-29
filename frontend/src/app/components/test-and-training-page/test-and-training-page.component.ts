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
  isRemarked: Boolean = false;

  constructor(private activatedroute: ActivatedRoute, private formService: FormService, private testStatusService: TestStatusService) {
  }
  intervalData: any;

  getTimeFromGMTTime(dateTime: string): any {
    return new Date(dateTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.intervalData =
      setInterval(() => {
        this.testStatusService.getTestStatus(this.testDetails.dlNo, this.testDetails.attempt).subscribe((response) => {
          this.sensorsCrossed = "LS " + response.filter((sensor: { isLast: boolean; sensorId: number }) => sensor.isLast === false).map((sensor: { sensorId: number; }) => sensor.sensorId).join(",");
          if (response.length > 1 && response[response.length - 1].isLast) {
            this.testDetails.duration = new Date(response[response.length - 1].createdAt).getTime() - new Date(response[0].createdAt).getTime();
            this.testDetails.startTime = this.getTimeFromGMTTime(response[0].createdAt);
            this.testDetails.endTime = this.getTimeFromGMTTime(response[response.length - 1].createdAt);
            this.testDetails.status = (response.length - 2) >= this.testDetails.sensorCount ? "Fail" : this.checkPercentage(this.testDetails.duration);
            this.testDetails.isCompleted = true;
            this.isPrintEnabled = (this.testDetails.remarks !== undefined) ? true : false;
            this.formService.updateTestDetails(this.testDetails).subscribe(() => {
              clearInterval(this.intervalData);
            });
            if (this.testDetails.remarks !== undefined) {
              this.isRemarked = true;
            }
          } else {
            this.testDetails.duration = 0;
            if ((response.length - 2) >= this.testDetails.sensorCount) {
              this.testDetails.status = "Fail";
              this.testDetails.isCompleted = true;
            } else {
              this.testDetails.status = "In Progress";
              this.testDetails.isCompleted = false;
            }
            this.isPrintEnabled = false;
            this.isRemarked = false;
          }
        })
      }, 500);
  }

  getUserDetails(): void {
    this.formService.getTestDetails(this.activatedroute.snapshot.paramMap.get("id")!).subscribe((response) => {
      this.testDetails = response;
      this.isDetailsFetched = true;
    })
  }

  endTest(): void {
    this.testStatusService.getTestStatus(this.testDetails.dlNo, this.testDetails.attempt).subscribe((response) => {
      this.testDetails.duration = new Date(response[response.length - 1].createdAt).getTime() - new Date(response[0].createdAt).getTime();
      this.testDetails.startTime = this.getTimeFromGMTTime(response[0].createdAt);
      this.testDetails.endTime = this.getTimeFromGMTTime(response[response.length - 1].createdAt);
      this.testDetails.status = (response.length - 2) >= this.testDetails.sensorCount ? "Fail" : this.checkPercentage(this.testDetails.duration);
      this.testDetails.isCompleted = true;
      this.isPrintEnabled = (this.testDetails.remarks !== undefined) ? true : false;
      this.formService.updateTestDetails(this.testDetails).subscribe(() => {
        clearInterval(this.intervalData);
      });
    });
    /*     this.formService.endTest(testId).subscribe((response) => {
          clearInterval(this.intervalData);
          this.testDetails.duration = 0;//new Date(response.endDate).getTime() - new Date(response.startDate).getTime();
          this.testDetails.status = this.checkPercentage(this.testDetails.duration);
          this.testDetails.isCompleted = true;
        }) */
  }

  addRemarks(testId: string): void {
    this.formService.updateTestRemarks(testId, this.testDetails).subscribe((response) => {
      this.isPrintEnabled = true;
      this.isRemarked = true;
    });
  }

  checkPercentage(currentTiming: number): string {
    let percentage = (currentTiming / 330000) * 100;
    let response = "Fail";
    if (percentage > 85 && percentage <= 100)
      response = "Grade A";
    else if (percentage > 70 && percentage <= 85)
      response = "Grade B";
    else if (percentage > 60 && percentage <= 70)
      response = "Grade C";
    else if (percentage >= 50 && percentage <= 60)
      response = "Grade D";
    else if (percentage < 50)
      response = "Grade E";
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
            body{
              text-transform: uppercase;
            }
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
            .grade_b, .grade_a, .success {
              color: green!important;
            }
            .fail, .grade_e {
              color: red!important;
            }
            .grade_d, .grade_c {
              color: orange!important;
            }
            .pr-image {
              margin-left: 5%;
              margin-right: 5%; 
              width: 39%;
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
            .small-text{
              width: 90%;
              margin-left: 5%;
              margin-right: 5%;
              font-size: .75em;
              text-align: center;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
            <div class="body-content">
            <div style="width: 97.5%">
            <img src="../assets/images/logo.png" class="pr-header-logo"></img>
            <span style="width: 58.5%; display: inline-block; text-align: center; padding-left: 2%; padding-right: 2%"><h3>Ashok Leyland Driving Training Institute</h3><p>Vallipuram, Namakkal, Tamil Nadu - 637003.</p></span>
            <img src="../assets/images/company_logo.png" class="pr-header-company-logo"></img>
            </div>
            <hr><br/>`+ (toBePrinted.testType === 'Training' ? `<center><h4><u> TRAINING REPORT - ATTEMPT ${toBePrinted.attempt}</u></h4></center><br/>` : `<center><h4><u>TEST REPORT</u></h4></center><br/>`) + `
            <table style="text-align: left">
              <tr>
                <td><b>DL No :</b> ${toBePrinted.dlNo}</td><td></td>
              </tr>
              <tr>
                <td><b>Candidate Name :</b> ${toBePrinted.candidateName}</td><td></td>
              </tr>
              <tr>
                <td><b>Date of ${toBePrinted.testType} :</b> ${toBePrinted.dateOfTest}</td><td><b>Vehicle Type :</b> ${toBePrinted.vehicleType} (${toBePrinted.vehicleSubType})</td>
              </tr>
              <tr>
                <td><b>Start Time :</b> ${this.splitTimeOnly(toBePrinted.startTime)}</td><td><b>End Time :</b> ${this.splitTimeOnly(toBePrinted.endTime)}</td>
              </tr>
              <tr>
                <td><b>Trainer Name :</b> ${toBePrinted.trainerName}</td><td><b>Vehicle No :</b> ${toBePrinted.vehicleNumber}</td>
              </tr>
              <tr></tr>
              <tr>
                <td colspan="2"><b>Remarks :</b> ${toBePrinted.remarks}</td>
              </tr>
            </table>
            <br/>
            <table class="pr-table">
                <thead>
                    <tr class="pr-tr">
                        <th class="pr-th heading">Test Name</th>
                        <th class="pr-th heading">Sensors Crossed</th>
                        <th class="pr-th heading">Duration</th>
                        <th class="pr-th heading">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="pr-tr">
                        <td class="pr-td">8 Track</td>
                        <td class="pr-td">${this.sensorsCrossed}</td>
                        <td class="pr-td">${this.millisToMinutes(toBePrinted.duration)}</td>
                        <td class="pr-td">`+ (toBePrinted.status === 'Fail' ? `` : `<span class="success"> Pass </span>`) + `<span class="${toBePrinted.status.toLowerCase().split(" ").join("_")}" > (${toBePrinted.status}) </span></td>
    </tr>
    </tbody>
    </table>
      `+ (toBePrinted.status !== 'Fail' ? ` <span class= "small-text"> (in %): 100 - 86: Grade A, 85 - 71: Grade B, 70 - 61: Grade C, 60 - 50: Grade D, <50: Grade E </span>` : ``) + `<br/> <br/>
      <img src = "../assets/images/sensor_details.jpg" class= "pr-image"> </img>`+(this.sensorsCrossed.indexOf(",") === -1 ? `<img src = "../assets/images/single_sensors/${this.sensorsCrossed.substr(this.sensorsCrossed.length - 1)}.jpg" class= "pr-image"></image>` : ``)+` <br/> <br/>
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

  splitTimeOnly(timeString: string) {
    return timeString.split(", ")[1];
  }
}

