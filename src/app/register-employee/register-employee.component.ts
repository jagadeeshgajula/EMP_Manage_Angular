import { EmployeeDetailsService } from './../services/employee-details.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  employeeRoles: any = [];
  projectDetails: any = [];
  constructor(private formBuilder: FormBuilder, private employeeDetailsService: EmployeeDetailsService) { }
  ngOnDestroy(): void {
    sessionStorage.removeItem("employeeId");
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      employeeId: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dob: ['', Validators.required],
      employeeRole: [null, Validators.required],
      projectDetail: [null, Validators.required]
    });

    let empId = sessionStorage.getItem("employeeId");
    if (empId) {
      this.employeeDetailsService.getEmployeeDetailsByEmployeeId(empId).subscribe(res => {
        console.log(res);
        this.registerForm.setValue(res);
      }, error => {
        console.log(error);
      });
    }

    this.employeeDetailsService.getAllEmployeeRoles().subscribe(res => {
      this.employeeRoles = res;
    });
    this.employeeDetailsService.getAllProjectDetails().subscribe(res => {
      this.projectDetails = res;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success

    if (!this.registerForm.get('employeeId').value) {
      this.employeeDetailsService.saveEmployee(this.registerForm.value).subscribe(
        res => {
          console.log(res)
          alert("Data Saved");
          this.registerForm.reset();
        }, error => {
          console.log(error)
        }
      );
    }
    else {
      this.employeeDetailsService.updateEmployee(this.registerForm.value).subscribe(
        res => {
          console.log(res)
          alert("Data Updated");
          this.registerForm.reset();
          sessionStorage.removeItem("employeeId");
        }, error => {
          console.log(error)
        }
      );
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
