import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: uuidv4(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-123-4567',
      dob: '1985-07-15',
      hireDate: '2020-03-10',
      department: 'IT',
      position: 'Senior Developer',
      salary: 95000,
      address: '123 Main St',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'USA',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: uuidv4(),
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '555-987-6543',
      dob: '1990-04-22',
      hireDate: '2021-01-15',
      department: 'HR',
      position: 'HR Specialist',
      salary: 85000,
      address: '456 Oak Ave',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: uuidv4(),
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      phone: '555-246-8135',
      dob: '1988-11-30',
      hireDate: '2019-08-20',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 92000,
      address: '789 Pine St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: uuidv4(),
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      phone: '555-369-1472',
      dob: '1992-02-18',
      hireDate: '2022-03-05',
      department: 'Marketing',
      position: 'Marketing Specialist',
      salary: 78000,
      address: '321 Elm St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: uuidv4(),
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@example.com',
      phone: '555-753-9514',
      dob: '1983-09-10',
      hireDate: '2018-11-15',
      department: 'IT',
      position: 'DevOps Engineer',
      salary: 110000,
      address: '654 Birch Rd',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
      imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
    }
  ];

  constructor() { }

  getAllEmployees(): Observable<Employee[]> {
    return of(this.employees).pipe(delay(500));
  }

  getEmployeeById(id: string): Observable<Employee | undefined> {
    const employee = this.employees.find(emp => emp.id === id);
    return of(employee).pipe(delay(300));
  }

  createEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    const newEmployee = {
      id: uuidv4(),
      ...employee
    };
    this.employees.push(newEmployee);
    return of(newEmployee).pipe(delay(500));
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee | undefined> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = {
        ...this.employees[index],
        ...employee
      };
      return of(this.employees[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteEmployee(id: string): Observable<boolean> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(300));
  }
}