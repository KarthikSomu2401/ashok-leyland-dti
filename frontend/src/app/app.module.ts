import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { JsonFormComponent } from './components/json-form/json-form.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { SplitAndTitleCasePipe } from './_utils/split-and-title-case.pipe';
import { MillisToMinutesAndSecondsPipe } from './_utils/millis-to-minutes-and-seconds.pipe';
import { TestDetailsFormComponent } from './components/test-details-form/test-details-form.component';
import { TestAndTrainingPageComponent } from './components/test-and-training-page/test-and-training-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterTestFormComponent } from './components/register-test-form/register-test-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    JsonFormComponent,
    ToolBarComponent,
    SplitAndTitleCasePipe,
    MillisToMinutesAndSecondsPipe,
    TestDetailsFormComponent,
    TestAndTrainingPageComponent,
    DashboardComponent,
    RegisterTestFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSliderModule,
    MatToolbarModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
