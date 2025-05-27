import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Salary } from '../models/salary.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private salaries: Salary[] = [
    {
      id: uuidv4(),
      employeeId: '1',
      employeeName: 'John Doe',
      amount: 7916.67,
      paymentDate: '2023-10-30',
      paymentPeriod: 'October 2023',
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      description: 'Monthly salary'
    },
    {
      id: uuidv4(),
      employeeId: '2',
      employeeName: 'Jane Smith',
      amount: 7083.33,
      paymentDate: '2023-10-30',
      paymentPeriod: 'October 2023',
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      description: 'Monthly salary'
    },
    {
      id: uuidv4(),
      employeeId: '3',
      employeeName: 'Michael Johnson',
      amount: 7666.67,
      paymentDate: '2023-10-30',
      paymentPeriod: 'October 2023',
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      description: 'Monthly salary'
    },
    {
      id: uuidv4(),
      employeeId: '4',
      employeeName: 'Emily Davis',
      amount: 6500.00,
      paymentDate: '2023-10-30',
      paymentPeriod: 'October 2023',
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      description: 'Monthly salary'
    },
    {
      id: uuidv4(),
      employeeId: '5',
      employeeName: 'David Wilson',
      amount: 9166.67,
      paymentDate: '2023-10-30',
      paymentPeriod: 'October 2023',
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      description: 'Monthly salary'
    }
  ];

  constructor() { }

  getAllSalaries(): Observable<Salary[]> {
    return of(this.salaries).pipe(delay(500));
  }

  getSalaryById(id: string): Observable<Salary | undefined> {
    const salary = this.salaries.find(s => s.id === id);
    return of(salary).pipe(delay(300));
  }

  getSalariesByEmployeeId(employeeId: string): Observable<Salary[]> {
    const employeeSalaries = this.salaries.filter(s => s.employeeId === employeeId);
    return of(employeeSalaries).pipe(delay(500));
  }

  createSalary(salary: Omit<Salary, 'id'>): Observable<Salary> {
    const newSalary = {
      id: uuidv4(),
      ...salary
    };
    this.salaries.push(newSalary);
    return of(newSalary).pipe(delay(500));
  }

  updateSalary(id: string, salary: Partial<Salary>): Observable<Salary | undefined> {
    const index = this.salaries.findIndex(s => s.id === id);
    if (index !== -1) {
      this.salaries[index] = {
        ...this.salaries[index],
        ...salary
      };
      return of(this.salaries[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteSalary(id: string): Observable<boolean> {
    const index = this.salaries.findIndex(s => s.id === id);
    if (index !== -1) {
      this.salaries.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(300));
  }
}