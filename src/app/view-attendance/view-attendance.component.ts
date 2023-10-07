import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  employees: any;
  employeeID: any;
  constructor(
    private employee: EmployeesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  selectedDateTime: Date | any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeID = params['id'];
      try {
        this.employee.getEmployeeBYID(this.employeeID).then((data) => {
          this.employees = data;
          console.log(this.employees);
          console.log(data);
        });
      } catch {}
    });
  }
  addNewDate() {
    console.log(this.selectedDateTime);
    this.employee
      .pushDate(this.employeeID, this.selectedDateTime)
      .then((res) => {
        console.log('suceess', res);

        this.employee.getEmployeeBYID(this.employeeID).then((data) => {
          this.employees = data;
          console.log(this.employees);
          console.log(data);
        });
        this.snackBar.open('added date successfully ', 'close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      })
      .catch((error) => {
        console.error('error adding date', error);
      });
  }
  deleteDate(id: String, index: number) {
    console.log(id);

    this.employee
      .deleteDate(id, index)
      .then((res) => {
        console.log('Success', res);

        this.employee.getEmployeeBYID(this.employeeID).then((data) => {
          this.employees = data;
          console.log(this.employees);
          console.log(data);
        });
        this.snackBar.open('remove Date successfully ', 'close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      })
      .catch((error) => {
        console.error('error removing date', error);
      });
  }
}
