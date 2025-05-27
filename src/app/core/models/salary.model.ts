export interface Salary {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  paymentDate: string;
  paymentPeriod: string;
  paymentMethod: string;
  status: string;
  description?: string;
}