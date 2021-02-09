import { Environment } from './../core/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  env = new Environment();
  constructor(private http: HttpClient) { }

  saveEmployee(obj) {
    return this.http.post(this.env.url + "saveEmployeeDetails", obj);
  }

  updateEmployee(obj) {
    return this.http.put(this.env.url + "updateEmployeeDetails", obj);
  }

  searchEmployee(obj) {
    return this.http.post(this.env.url + "searchEmployeeDetails", obj);
  }
  deleteEmployee(employeeId) {
    return this.http.delete(this.env.url + "deleteEmployeeDetails?employeeDetailId=" + employeeId);
  }
  getEmployeeDetailsByEmployeeId(empId) {
    return this.http.get(this.env.url + "getEmployeeDetailsById?employeeDetailId=" + empId);
  }

  getAllEmployeeRoles() {
    return this.http.get(this.env.url + "getAllEmployeeRolls");
  }

  getAllProjectDetails() {
    return this.http.get(this.env.url + "getallprojects");
  }
}
