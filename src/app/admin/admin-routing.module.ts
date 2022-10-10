import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../_services/auth-guard.service';

const routes: Routes = [
  {path:'',component:SigninComponent},
  {path:'dashboard',component:DashboardComponent,canActivate : [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
