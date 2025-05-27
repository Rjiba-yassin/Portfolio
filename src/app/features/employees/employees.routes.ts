import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'add',
    component: EmployeeFormComponent
  },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent
  },
  {
    path: ':id',
    component: EmployeeDetailComponent
  }
];