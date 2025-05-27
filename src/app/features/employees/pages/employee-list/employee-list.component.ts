import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/employee.model';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent, SearchInputComponent, DataTableComponent],
  template: `
    <div class="employee-list-container">
      <app-page-header title="Employees">
        <a [routerLink]="['/employees/add']" class="btn btn-primary">
          <i class="fas fa-plus"></i> Add Employee
        </a>
      </app-page-header>
      
      <div class="card">
        <div class="card-body">
          <app-data-table
            [columns]="columns"
            [items]="employees"
            [actions]="actions"
            [showSearch]="true"
            [searchPlaceholder]="'Search employees...'"
            [showPagination]="true"
            [emptyMessage]="'No employees found'"
            (rowClick)="onRowClick($event)"
          >
            <div tableActions></div>
          </app-data-table>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { 
      key: 'fullName', 
      label: 'Name', 
      sortable: true,
      formatter: (_, row) => `${row.firstName} ${row.lastName}`
    },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
    { 
      key: 'hireDate', 
      label: 'Hire Date', 
      sortable: true,
      type: 'date'
    }
  ];
  
  actions = [
    {
      label: 'View',
      icon: 'fas fa-eye',
      color: 'btn-info',
      click: (employee: Employee) => this.viewEmployee(employee)
    },
    {
      label: 'Edit',
      icon: 'fas fa-edit',
      color: 'btn-primary',
      click: (employee: Employee) => this.editEmployee(employee)
    },
    {
      label: 'Delete',
      icon: 'fas fa-trash',
      color: 'btn-danger',
      click: (employee: Employee) => this.deleteEmployee(employee)
    }
  ];
  
  constructor(private employeeService: EmployeeService) {}
  
  ngOnInit(): void {
    this.loadEmployees();
  }
  
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = employees;
    });
  }
  
  searchEmployees(searchText: string): void {
    if (!searchText) {
      this.filteredEmployees = this.employees;
      return;
    }
    
    const lowerText = searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp => 
      emp.firstName.toLowerCase().includes(lowerText) ||
      emp.lastName.toLowerCase().includes(lowerText) ||
      emp.email.toLowerCase().includes(lowerText) ||
      emp.department.toLowerCase().includes(lowerText) ||
      emp.position.toLowerCase().includes(lowerText)
    );
  }
  
  viewEmployee(employee: Employee): void {
    window.location.href = `/employees/${employee.id}`;
  }
  
  editEmployee(employee: Employee): void {
    window.location.href = `/employees/edit/${employee.id}`;
  }
  
  deleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      this.employeeService.deleteEmployee(employee.id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }
  
  onRowClick(employee: Employee): void {
    this.viewEmployee(employee);
  }
}