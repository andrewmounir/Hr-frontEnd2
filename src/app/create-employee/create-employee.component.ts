import { EmployeesService } from './../employees.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  constructor(
    private EmployeesService: EmployeesService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {}

  firstName: String = '';
  lastName: String = '';
  email: String = '';
  password: String = '';
  group: String = '';
  employeeType: String = '';

  async onSubmit() {
    this.EmployeesService.createEmployee(
      this.email,
      this.firstName,
      this.lastName,
      this.password,
      this.group,
      this.employeeType
    )
      .then((Response) => {
        console.log('success');
        this.snackBar.open('successfully created user', 'close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.group = '';
        this.employeeType = '';
      })
      .catch(() => {
        console.error('Error While Creating');
      });
  }


  cancelEdit() {
    this.router.navigate(['/dash-board']);
  }
}
