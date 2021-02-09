import { EmployeeDetailsService } from './../services/employee-details.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
  searchForm: FormGroup;
  submitted = false;
  searchData: any = [];
  constructor(private formBuilder: FormBuilder, private employeeDetailsService: EmployeeDetailsService,
    private route: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      phoneNumber: [null],
      dob: [null]
    });
  }

  onSubmit() {
    this.employeeDetailsService.searchEmployee(this.searchForm.value).subscribe(res => {
      console.log(res)

      this.searchData = res;
      if (res['length'] == 0) {
        alert("No Records Found")
      }
    }, error => {
      console.log(error);
    });
  }

  deleteEmployee(employeeId) {

    this.employeeDetailsService.deleteEmployee(employeeId).subscribe(res => {
      console.log(res)
      alert("data Deleted")
      //this.searchData = res;
      this.onSubmit();
    }, error => {
      console.log(error);
    });
  }

  editEmployee(employeeId) {
    sessionStorage.setItem("employeeId", employeeId);
    this.route.navigate(["dashboard/registerEmployee"]);
  }
}
