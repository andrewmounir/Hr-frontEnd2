import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  url = environment.apiUrl;

  constructor() {}
  login(email: string, password: string): Promise<any> {
    const apiUrl = `${this.url}/loginpage`;
    console.log(this.url);

    const loginData = {
      email: email,
      password: password
    };

    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    });
  }

  getEmployee(): Promise<any> {
    const apiUrl = `${this.url}/getAll`;

    return fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error('fetching Data Failed Server maybe Down');
      }

      return response.json();
    });
  }

  createEmployee(
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    group: String,
    employeeType: String
  ): Promise<any> {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      employeeType: employeeType,
      password: password,
      group: group
    };

    const apiUrl = `${this.url}/employees`;
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (!res.ok) {
        throw new Error('error SomethingWentWrong');
      }

      return res.json();
    });
  }

  deleteEmployee(id: String): Promise<any> {
    const data = {
      id: id
    };
    const apiUrl = `${this.url}/employeesdelete/${id}`;

    return fetch(apiUrl, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Cannot find user to delete');
      }

      res.json();
    });
  }

  getEmployeeBYID(id: String): Promise<any> {
    const apiUrl = `${this.url}/getEmployee/${id}`;
    return fetch(apiUrl).then((response) => {
      if (!response.ok) {
        throw new Error('fetching user by id failed');
      }

      return response.json();
    });
  }

  updateEmployee(id: String, updateEmployeeData: any): Promise<any> {
    const apiUrl = `${this.url}/updateEmployee/${id}`;

    return fetch(apiUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateEmployeeData)
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Update failed');
      }
      return res.json();
    });
  }

  pushDate(id: String, date: Date): Promise<any> {
    const formattedDate = date.toISOString();
    const apiUrl = `${this.url}/addAttendance/${id}`;
    return fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: formattedDate })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('adding date failed');
        }
        console.log(`success`);

        return res.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteDate(id: String, index: number): Promise<any> {
    console.log(id);

    const apiUrl = `${this.url}/deleteSpecificDate/${id}/${index}`;

    return fetch(apiUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Delete failed');
        }
        console.log('Date deleted successfully');
        return res.json();
      })
      .catch((error) => {
        console.error('Error deleting date:', error);
      });
  }
}
