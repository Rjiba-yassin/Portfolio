import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../core/services/employee.service';
import { DepartmentService } from '../../../../core/services/department.service';
import { LeaveService } from '../../../../core/services/leave.service';
import { SalaryService } from '../../../../core/services/salary.service';
import { Employee } from '../../../../core/models/employee.model';
import { Department } from '../../../../core/models/department.model';
import { Leave } from '../../../../core/models/leave.model';
import { Salary } from '../../../../core/models/salary.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1 class="page-title">Dashboard</h1>
      
      <div class="row">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="stat-card bg-primary text-white">
            <i class="fas fa-users stat-icon"></i>
            <div class="stat-info">
              <h3>{{ totalEmployees }}</h3>
              <p>Employees</p>
            </div>
          </div>
        </div>
        
        <div class="col-12 col-md-6 col-lg-3">
          <div class="stat-card bg-info text-white">
            <i class="fas fa-sitemap stat-icon"></i>
            <div class="stat-info">
              <h3>{{ totalDepartments }}</h3>
              <p>Departments</p>
            </div>
          </div>
        </div>
        
        <div class="col-12 col-md-6 col-lg-3">
          <div class="stat-card bg-warning">
            <i class="fas fa-calendar-alt stat-icon"></i>
            <div class="stat-info">
              <h3>{{ totalLeaves }}</h3>
              <p>Leave Requests</p>
            </div>
          </div>
        </div>
        
        <div class="col-12 col-md-6 col-lg-3">
          <div class="stat-card bg-success text-white">
            <i class="fas fa-money-bill-alt stat-icon"></i>
            <div class="stat-info">
              <h3>{{ totalSalary | currency }}</h3>
              <p>Monthly Payroll</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title">Recent Employees</h5>
              <a [routerLink]="['/employees']" class="btn btn-sm btn-primary">View All</a>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Hire Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let employee of recentEmployees">
                      <td>{{ employee.firstName }} {{ employee.lastName }}</td>
                      <td>{{ employee.department }}</td>
                      <td>{{ employee.position }}</td>
                      <td>{{ employee.hireDate | date:'mediumDate' }}</td>
                    </tr>
                    <tr *ngIf="recentEmployees.length === 0">
                      <td colspan="4" class="text-center">No employees found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-12 col-lg-6 mt-4 mt-lg-0">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title">Leave Requests</h5>
              <a [routerLink]="['/leaves']" class="btn btn-sm btn-primary">View All</a>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let leave of recentLeaves">
                      <td>{{ leave.employeeName }}</td>
                      <td>{{ leave.leaveType }}</td>
                      <td>{{ leave.startDate | date:'mediumDate' }}</td>
                      <td>{{ leave.endDate | date:'mediumDate' }}</td>
                      <td>
                        <span class="badge" [ngClass]="{
                          'badge-success': leave.status === 'approved',
                          'badge-warning': leave.status === 'pending',
                          'badge-danger': leave.status === 'rejected'
                        }">
                          {{ leave.status }}
                        </span>
                      </td>
                    </tr>
                    <tr *ngIf="recentLeaves.length === 0">
                      <td colspan="5" class="text-center">No leave requests found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title">Department Overview</h5>
              <a [routerLink]="['/departments']" class="btn btn-sm btn-primary">View All</a>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Manager</th>
                      <th>Employees</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let department of departments">
                      <td>{{ department.name }}</td>
                      <td>{{ department.managerName || 'Not Assigned' }}</td>
                      <td>{{ department.employeeCount }}</td>
                      <td>{{ department.createdAt | date:'mediumDate' }}</td>
                    </tr>
                    <tr *ngIf="departments.length === 0">
                      <td colspan="4" class="text-center">No departments found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      animation: fadeIn 0.5s;
    }
    
    .page-title {
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    
    .stat-card {
      border-radius: var(--border-radius);
      padding: 1.5rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
    }
    
    .stat-icon {
      font-size: 2.5rem;
      margin-right: 1rem;
    }
    
    .stat-info h3 {
      font-size: 1.75rem;
      margin-bottom: 0.25rem;
      font-weight: 600;
    }
    
    .stat-info p {
      margin-bottom: 0;
      opacity: 0.9;
    }
    
    .table th {
      font-weight: 600;
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    
    .badge-success {
      background-color: var(--success);
      color: white;
    }
    
    .badge-warning {
      background-color: var(--warning);
      color: white;
    }
    
    .badge-danger {
      background-color: var(--danger);
      color: white;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  totalDepartments = 0;
  totalLeaves = 0;
  totalSalary = 0;
  
  recentEmployees: Employee[] = [];
  departments: Department[] = [];
  recentLeaves: Leave[] = [];
  
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private leaveService: LeaveService,
    private salaryService: SalaryService
  ) {}
  
  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  loadDashboardData(): void {
    forkJoin({
      employees: this.employeeService.getAllEmployees(),
      departments: this.departmentService.getAllDepartments(),
      leaves: this.leaveService.getAllLeaves(),
      salaries: this.salaryService.getAllSalaries()
    }).subscribe(data => {
      // Employees
      this.totalEmployees = data.employees.length;
      this.recentEmployees = [...data.employees]
        .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
        .slice(0, 5);
      
      // Departments
      this.totalDepartments = data.departments.length;
      this.departments = data.departments;
      
      // Leaves
      this.totalLeaves = data.leaves.length;
      this.recentLeaves = [...data.leaves]
        .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
        .slice(0, 5);
      
      // Salaries
      this.totalSalary = data.salaries
        .reduce((total, salary) => total + salary.amount, 0);
    });
  }
}