import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Department } from '../models/department.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departments: Department[] = [
    {
      id: uuidv4(),
      name: 'IT',
      description: 'Information Technology Department',
      managerId: '1',
      managerName: 'David Wilson',
      employeeCount: 12,
      createdAt: '2018-01-15'
    },
    {
      id: uuidv4(),
      name: 'HR',
      description: 'Human Resources Department',
      managerId: '2',
      managerName: 'Jane Smith',
      employeeCount: 6,
      createdAt: '2018-01-15'
    },
    {
      id: uuidv4(),
      name: 'Finance',
      description: 'Finance and Accounting Department',
      managerId: '3',
      managerName: 'Michael Johnson',
      employeeCount: 8,
      createdAt: '2018-02-20'
    },
    {
      id: uuidv4(),
      name: 'Marketing',
      description: 'Marketing and Communications Department',
      managerId: '4',
      managerName: 'Emily Davis',
      employeeCount: 10,
      createdAt: '2019-03-10'
    },
    {
      id: uuidv4(),
      name: 'Sales',
      description: 'Sales and Business Development Department',
      managerId: '5',
      managerName: 'Robert Brown',
      employeeCount: 15,
      createdAt: '2019-04-25'
    }
  ];

  constructor() { }

  getAllDepartments(): Observable<Department[]> {
    return of(this.departments).pipe(delay(500));
  }

  getDepartmentById(id: string): Observable<Department | undefined> {
    const department = this.departments.find(dept => dept.id === id);
    return of(department).pipe(delay(300));
  }

  createDepartment(department: Omit<Department, 'id'>): Observable<Department> {
    const newDepartment = {
      id: uuidv4(),
      ...department
    };
    this.departments.push(newDepartment);
    return of(newDepartment).pipe(delay(500));
  }

  updateDepartment(id: string, department: Partial<Department>): Observable<Department | undefined> {
    const index = this.departments.findIndex(dept => dept.id === id);
    if (index !== -1) {
      this.departments[index] = {
        ...this.departments[index],
        ...department
      };
      return of(this.departments[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteDepartment(id: string): Observable<boolean> {
    const index = this.departments.findIndex(dept => dept.id === id);
    if (index !== -1) {
      this.departments.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(300));
  }
}