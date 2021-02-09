import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: "registerEmployee", component: RegisterEmployeeComponent },
      { path: "searchEmployee", component: SearchEmployeeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
