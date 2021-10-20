import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TestAndTrainingPageComponent } from './components/test-and-training-page/test-and-training-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterTestFormComponent } from './components/register-test-form/register-test-form.component';

const routes: Routes = [
  {
    path: 'dashboard', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home' },
      { path: 'home', component: DashboardComponent },
      { path: 'test-form', component: RegisterTestFormComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detailpage/:id', component: TestAndTrainingPageComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }