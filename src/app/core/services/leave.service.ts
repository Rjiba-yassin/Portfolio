import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Leave } from '../models/leave.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private leaves: Leave[] = [
    {
      id: uuidv4(),
      employeeId: '1',
      employeeName: 'John Doe',
      leaveType: 'Annual Leave',
      startDate: '2023-09-10',
      endDate: '2023-09-15',
      reason: 'Family vacation',
      status: 'approved',
      appliedDate: '2023-08-20',
      approvedBy: 'Jane Smith',
      approvedDate: '2023-08-22'
    },
    {
      id: uuidv4(),
      employeeId: '2',
      employeeName: 'Jane Smith',
      leaveType: 'Sick Leave',
      startDate: '2023-10-05',
      endDate: '2023-10-06',
      reason: 'Doctor appointment',
      status: 'approved',
      appliedDate: '2023-10-04',
      approvedBy: 'David Wilson',
      approvedDate: '2023-10-04'
    },
    {
      id: uuidv4(),
      employeeId: '3',
      employeeName: 'Michael Johnson',
      leaveType: 'Personal Leave',
      startDate: '2023-11-20',
      endDate: '2023-11-22',
      reason: 'Family matters',
      status: 'pending',
      appliedDate: '2023-11-10'
    },
    {
      id: uuidv4(),
      employeeId: '4',
      employeeName: 'Emily Davis',
      leaveType: 'Maternity Leave',
      startDate: '2023-12-01',
      endDate: '2024-03-01',
      reason: 'Maternity leave',
      status: 'approved',
      appliedDate: '2023-11-01',
      approvedBy: 'David Wilson',
      approvedDate: '2023-11-05'
    },
    {
      id: uuidv4(),
      employeeId: '5',
      employeeName: 'David Wilson',
      leaveType: 'Annual Leave',
      startDate: '2023-11-25',
      endDate: '2023-11-30',
      reason: 'End of year vacation',
      status: 'rejected',
      appliedDate: '2023-11-15',
      rejectionReason: 'Critical project deadline'
    }
  ];

  constructor() { }

  getAllLeaves(): Observable<Leave[]> {
    return of(this.leaves).pipe(delay(500));
  }

  getLeaveById(id: string): Observable<Leave | undefined> {
    const leave = this.leaves.find(l => l.id === id);
    return of(leave).pipe(delay(300));
  }

  getLeavesByEmployeeId(employeeId: string): Observable<Leave[]> {
    const employeeLeaves = this.leaves.filter(l => l.employeeId === employeeId);
    return of(employeeLeaves).pipe(delay(500));
  }

  createLeave(leave: Omit<Leave, 'id'>): Observable<Leave> {
    const newLeave = {
      id: uuidv4(),
      ...leave
    };
    this.leaves.push(newLeave);
    return of(newLeave).pipe(delay(500));
  }

  updateLeave(id: string, leave: Partial<Leave>): Observable<Leave | undefined> {
    const index = this.leaves.findIndex(l => l.id === id);
    if (index !== -1) {
      this.leaves[index] = {
        ...this.leaves[index],
        ...leave
      };
      return of(this.leaves[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(300));
  }

  approveLeave(id: string, approvedBy: string): Observable<Leave | undefined> {
    const index = this.leaves.findIndex(l => l.id === id);
    if (index !== -1 && this.leaves[index].status === 'pending') {
      this.leaves[index] = {
        ...this.leaves[index],
        status: 'approved',
        approvedBy,
        approvedDate: new Date().toISOString().split('T')[0]
      };
      return of(this.leaves[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(300));
  }

  rejectLeave(id: string, rejectionReason: string): Observable<Leave | undefined> {
    const index = this.leaves.findIndex(l => l.id === id);
    if (index !== -1 && this.leaves[index].status === 'pending') {
      this.leaves[index] = {
        ...this.leaves[index],
        status: 'rejected',
        rejectionReason
      };
      return of(this.leaves[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(300));
  }

  deleteLeave(id: string): Observable<boolean> {
    const index = this.leaves.findIndex(l => l.id === id);
    if (index !== -1) {
      this.leaves.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(300));
  }
}