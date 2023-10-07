import { EmployeesService } from './../employees.service';
import { Component } from '@angular/core';
import { Employee } from '../employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {
  employees: Employee[] = [];

  constructor(
    private EmployeesService: EmployeesService,
    private MatSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.EmployeesService.getEmployee().then((res) => {
      this.employees = res;

      console.log(res);
    });
  }

  editEmployee(employeeID: String) {
    console.log('Edit Employee Clicked:', employeeID);
    this.EmployeesService.getEmployee().then(() => {});
    this.router.navigate(['/employee-details', employeeID]);
  }

  deleteEmployee(id: String) {
    console.log('Delete Employee Clicked:', id);

    this.EmployeesService.deleteEmployee(id).then(() => {
      this.employees = this.employees.filter((employee) => employee._id !== id);
      this.MatSnackBar.open('Deleted Successfully', 'close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    });
  }

  viewAttendance(id: String) {
   
    this.router.navigate(['/view-Attendance', id]);
  }
}
