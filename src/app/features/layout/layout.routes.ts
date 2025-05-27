import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: 'employees',
        loadChildren: () => import('../employees/employees.routes').then(m => m.EMPLOYEES_ROUTES)
      },
      {
        path: 'departments',
        loadChildren: () => import('../departments/departments.routes').then(m => m.DEPARTMENTS_ROUTES)
      },
      {
        path: 'leaves',
        loadChildren: () => import('../leaves/leaves.routes').then(m => m.LEAVES_ROUTES)
      },
      {
        path: 'salary',
        loadChildren: () => import('../salary/salary.routes').then(m => m.SALARY_ROUTES)
      },
      {
        path: 'settings',
        loadComponent: () => import('../settings/pages/settings/settings.component').then(c => c.SettingsComponent)
      }
    ]
  }
];