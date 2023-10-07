import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any = {};

  constructor(
    private route: ActivatedRoute,
    private EmployeesService: EmployeesService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const employeeID = params['id'];

      try {
        console.log(employeeID);

        this.employee = await this.EmployeesService.getEmployeeBYID(employeeID);
        console.log(this.employee);
      } catch (error) {
        console.error('error getting data', error);
      }
    });
  }
  saveChanges(): void {
    this.route.params.subscribe(async (params) => {
      const employeeID = params['id'];

      try {
        console.log(employeeID);
        console.log(this.employee);

        await this.EmployeesService.updateEmployee(employeeID, this.employee);
        this.snackbar.open('employee edit success', 'close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        console.log('Employee updated successfully');
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    });
  }
  cancelEdit() {
    this.router.navigate(['/dash-board']);
  }
}
