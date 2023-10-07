import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';

const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent },
  { path: 'dash-board', component: DashBoardComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'view-Attendance/:id', component: ViewAttendanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
