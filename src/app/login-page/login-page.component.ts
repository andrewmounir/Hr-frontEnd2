import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeesService } from './../employees.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  constructor(
    private EmployeesService: EmployeesService,
    private router: Router,
    private SnackBar: MatSnackBar
  ) {}
  async onSubmit() {
    try {
      const response = await this.EmployeesService.login(
        this.email,
        this.password
      );
      console.log('succcess');

      this.router.navigate(['/dash-board']);
      this.SnackBar.open('Login Success Welcome', 'close', {
        duration: 6000,
        panelClass: ['success-snackbar']
      });
    } catch (error) {
      this.SnackBar.open(
        'Empty or invalid Credentials please make sure you are HR User',
        'close',
        {
          duration: 6000,
          panelClass: ['success-snackbar']
        }
      );
      console.error('login error', error);
    }
  }
}
