import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/_services/form.service';
import { TestDetailsForm } from 'src/app/_models/test-details-form';
import { TestStatusService } from 'src/app/_services/test-status.service';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { countUpTimerConfigModel, timerTexts, CountupTimerService } from 'ngx-timer';
import * as moment from 'moment-timezone';


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
  isDetailsFetched: Boolean = false;
  sensorsCrossed: string | any;
  isRemarked: Boolean = false;
  testConfig: any;
  testActiveStatus: string | any;

  constructor(private activatedroute: ActivatedRoute, private countupTimerService: CountupTimerService, private formService: FormService, private testStatusService: TestStatusService) {
  }
  intervalData: any;

  getTimeFromGMTTime(dateTime: string): any {
    return new Date(dateTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  }

  initiateTimerForTest(): void {
    //countUpTimerConfigModel
    this.testConfig = new countUpTimerConfigModel();

    //custom class
    this.testConfig.timerClass = 'test_Timer_class';

    //timer text values  
    this.testConfig.timerTexts = new timerTexts();
    this.testConfig.timerTexts.hourText = "Hours"; //default - hh
    this.testConfig.timerTexts.minuteText = "Minutes"; //default - mm
    this.testConfig.timerTexts.secondsText = "Seconds"; //default - ss
  }

  preventWindowRefresh(): void {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "This will reset the clock! Don't try doing this!";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });
  }

  ngOnInit(): void {
    moment.tz.setDefault('Asia/Kolkata');
    this.preventWindowRefresh();
    this.initiateTimerForTest();
    this.getUserDetails();
    this.intervalData = setInterval(() => {
      console.log(moment().format());
        this.testStatusService.getTestStatus(this.testDetails.dlNo, this.testDetails.attempt).subscribe((response) => {
          console.log(moment().milliseconds(), moment(response[0].createdAt).milliseconds(), moment().milliseconds()-moment(response[0].createdAt).milliseconds());
          if (response.length > 1 && response[0].isLast && response[response.length - 1].isLast) {
            this.countupTimerService.stopTimer();
            this.testActiveStatus = "(Test Completed)";
            this.testDetails.duration = new Date(response[response.length - 1].createdAt).getTime() - new Date(response[0].createdAt).getTime();
            this.testDetails.startTime = this.getTimeFromGMTTime(response[0].createdAt);
            this.testDetails.endTime = this.getTimeFromGMTTime(response[response.length - 1].createdAt);
            this.testDetails.status = (response.length - 2) > this.testDetails.sensorCount ? "Fail" : this.checkPercentage(this.testDetails.duration, this.testDetails.overall);
            this.testDetails.isCompleted = true;
            this.testDetails.isActive = false;
            this.isPrintEnabled = (this.testDetails.remarks !== undefined) ? true : false;
            this.formService.updateTestDetails(this.testDetails).subscribe(() => {
              clearInterval(this.intervalData);
              console.log('Test Completed!!!');
            });
            this.isRemarked = (this.testDetails.remarks !== undefined) ? true : false;
          } else if (this.testDetails.isActive) {            
            this.testActiveStatus = "(Test InProgress)";
            this.testDetails.duration = new Date(moment().toLocaleString()).getTime() - new Date(response[0].createdAt).getTime();
            console.log(moment().milliseconds(), moment(response[0].createdAt).milliseconds(), moment().milliseconds()-moment(response[0].createdAt).milliseconds());
            this.sensorsCrossed = response.filter((sensor: { isLast: boolean; sensorId: number }) => sensor.isLast === false).map((sensor: { sensorId: number; }) => sensor.sensorId).join(",");
            this.testDetails.status = "In Progress";
            if (this.checkVehicleDurationLimits(this.testDetails, this.testDetails.duration)) {
              this.testDetails.status = "Fail";
              this.testActiveStatus = "(Test Completed)";
              this.testDetails.isCompleted = true;
              this.testDetails.isActive = false;
              this.isPrintEnabled = (this.testDetails.remarks !== undefined) ? true : false;
              this.formService.updateTestDetails(this.testDetails).subscribe(() => {
                clearInterval(this.intervalData);
              });
            }
          } else if (response.length == 1 && response[0].isLast) {
            this.countupTimerService.startTimer();
            this.testActiveStatus = "(Test Started)";
            this.testDetails.isActive = true;            
            this.testDetails.status = "Started";
            console.log('Test Started!!!');
          }
        })
      }, 500);
  }

  getUserDetails(): void {
    this.formService.getTestDetails(this.activatedroute.snapshot.paramMap.get("id")!).subscribe((response) => {
      this.testDetails = response;
      this.isDetailsFetched = true;
      if (this.testDetails.vehicleType === "LCV") {
        this.testDetails.overall = 240000;
      } else if (this.testDetails.vehicleType === "HCV" && this.testDetails.vehicleSubType === "Tracker Trailer") {
        this.testDetails.overall = 480000;
      } else {
        this.testDetails.overall = 330000;
      }
    })
  }

  checkVehicleDurationLimits(testDetails: TestDetailsForm | any, duration: number): boolean {
    if (testDetails.vehicleType === "LCV" && duration > testDetails.overall) {
      return false;
    } else if (testDetails.vehicleType === "LCV" && duration <= testDetails.overall) {
      return true;
    } else if (testDetails.vehicleType === "HCV" && testDetails.vehicleSubType === "Tracker Trailer" && duration > testDetails.overall) {
      return false;
    } else if (testDetails.vehicleType === "HCV" && testDetails.vehicleSubType === "Tracker Trailer" && duration <= testDetails.overall) {
      return true;
    } else {
      if (duration > testDetails.overall) {
        return false;
      } else {
        return true;
      }
    }
  }

  endTest(): void {
    this.testStatusService.getTestStatus(this.testDetails.dlNo, this.testDetails.attempt).subscribe((response) => {
      this.countupTimerService.stopTimer();
      this.testActiveStatus = "(Test Completed)";
      this.testDetails.duration = new Date(response[response.length - 1].createdAt).getTime() - new Date(response[0].createdAt).getTime();
      this.testDetails.startTime = this.getTimeFromGMTTime(response[0].createdAt);
      this.testDetails.endTime = this.getTimeFromGMTTime(response[response.length - 1].createdAt);
      this.testDetails.status = (response.length - 2) > this.testDetails.sensorCount ? "Fail" : this.checkPercentage(this.testDetails.duration, this.testDetails.overall);
      this.testDetails.isCompleted = true;
      this.testDetails.isActive = false;
      this.isPrintEnabled = (this.testDetails.remarks !== undefined) ? true : false;
      this.formService.updateTestDetails(this.testDetails).subscribe(() => {
        clearInterval(this.intervalData);
        console.log('Test Completed!!!');
      });
    });
  }

  addRemarks(testId: string): void {
    this.formService.updateTestRemarks(testId, this.testDetails).subscribe((response) => {
      this.isPrintEnabled = true;
      this.isRemarked = true;
    });
  }

  checkPercentage(currentTiming: number, overallTiming: number): string {
    let percentage = (currentTiming / overallTiming) * 100;
    let response = "Fail";
    if (percentage > 80 && percentage <= 100)
      response = "Grade E";
    else if (percentage > 60 && percentage <= 80)
      response = "Grade D";
    else if (percentage > 40 && percentage <= 60)
      response = "Grade C";
    else if (percentage > 30 && percentage <= 40)
      response = "Grade B";
    else if (percentage < 30)
      response = "Grade A";
    return response;
  }

  print(toBePrinted: any): void {
    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>${toBePrinted.dlNo}_${toBePrinted.testType}_${new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}</title>
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
            .grade_e, .grade_d, .success {
              color: green!important;
            }
            .fail, .grade_a {
              color: red!important;
            }
            .grade_b, .grade_c {
              color: orange!important;
            }
            .pr-image {
              margin-left: 5%;
              margin-right: 5%; 
              width: 39%;
              height: 280px;
            }
            h4 {
              padding-left: 5%;
            }
            .body-content {
              margin-left: 1.25%;
              margin-right: 1.25%;
              margin-top: 1.25%;
              margin-bottom: 1.25%;
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
              font-size: .65em;
              padding-top: 2%;
              text-align: center;
            }
            .body-note {
              padding-left: 5%;
              font-size: 11px;
            }
            @media print {
              .pagebreak {
                  clear: both;
                  page-break-after: always;
              }
          }
          </style>
        </head>
        <body onload="window.print();window.close()">
            <div class="body-content">
            <div style="width: 97.5%">
            <img src="../assets/images/logo.png" class="pr-header-logo"></img>
            <span style="width: 58.5%; display: inline-block; text-align: center; padding-left: 2%; padding-right: 2%"><h3>Ashok Leyland Driving Training Institute<br><span style="font-size:0.7em">Vallipuram, Namakkal, Tamil Nadu - 637003.</span></h3><p>(COMPUTERISED DRIVING SKILL ANALYSIS SYSTEM)</p></span>
            <img src="../assets/images/company_logo.png" class="pr-header-company-logo"></img>
            </div>
            <hr>`+ (toBePrinted.testType === 'Training' ? `<center><h4><u> TRAINING REPORT - ATTEMPT ${toBePrinted.attempt}</u></h4></center>` : `<center><h4><u>TEST REPORT</u></h4></center>`) + `
            <table style="text-align: left">
              <tr>
                <td><b>Date of ${toBePrinted.testType} :</b> ${toBePrinted.dateOfTest}</td><td></td>
              </tr>
              <tr>
                <td><b>Start Time :</b> ${this.splitTimeOnly(toBePrinted.startTime)}</td><td><b>End Time :</b> ${this.splitTimeOnly(toBePrinted.endTime)}</td>
              </tr>
              <tr>
                <td><b>DL No :</b> ${toBePrinted.dlNo}</td><td><b>Candidate Name :</b> ${toBePrinted.candidateName}</td>
              </tr>
              <tr>
                <td><b>Vehicle No :</b> ${toBePrinted.vehicleNumber}</td><td><b>Vehicle Type :</b> ${toBePrinted.vehicleType} (${toBePrinted.vehicleSubType})</td>
              </tr>
              <tr>
                <td><b>Trainer Name :</b> ${toBePrinted.trainerName}</td><td><b>Remarks :</b> ${toBePrinted.remarks}</td>
              </tr>
            </table><br/>
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
                        <td class="pr-td">`+ (toBePrinted.status === 'Fail' ? `<span class="${toBePrinted.status.toLowerCase().split(" ").join("_")}" ><b> ${toBePrinted.status} </b></span>` : `<span class="success"> <b> Pass </b> <span class="${toBePrinted.status.toLowerCase().split(" ").join("_")}" > (${toBePrinted.status}) </span></span>`) + `</td>
    </tr>
    </tbody>
    </table>
      `+ (toBePrinted.status !== 'Fail' ? ` <span class= "small-text"> (Duration in %): 100 - 81: Grade E, 80 - 61: Grade D, 60 - 41: Grade C, 40 - 31: Grade B, <30: Grade A </span>` : ``) + `<br/><br/>
      <img src = "../assets/images/sensor_details.jpg" class= "pr-image"> </img>`+ (this.sensorsCrossed.indexOf(",") === -1 && this.hasNumber(this.sensorsCrossed) ? `<img src = "../assets/images/single_sensors/${this.sensorsCrossed.substr(3)}.jpg" class= "pr-image"></image>` : `<img src = "../assets/images/sensor_details.jpg" class= "pr-image"> </img>`) + ` <br/>
    <div class="body-note">
    <h3 style="text-decoration: underline">NOTE:</h3>
    <ol>
    <li>A Candidate is considered as Fail only if: 
      <ol>
        <li>If he/she exceeds the given time limit for each category of vehicle.</li>
        <li>If he/she crosses the loop sensors as specified by the training authorities.</li>
      </ol>
    </li>
    <li>Grade is assigned based on the effective time duration of his/her driving in the test track.</li>
    </ol>
    </div>
    <div style="height: 60px"></div>
      <div style="padding-left: 3%; padding-right: 3%"><p style="width: 30%; display: inline-block; text-align: center">Trainer</p><p style="width: 30%; display: inline-block; text-align: center">Training Officer</p><p style="width: 30%; display: inline-block; text-align: center">Head DTI</p></div>
      </div>
      <center><p>Powered by <a href="https://viruksham.co.in" target="_blank">@viruksham technologies</a></p></center>
    </body>
    </html>`
    );
    popupWin?.document.close();
  }

  hasNumber(myString: string) {
    return /\d/.test(myString);
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

