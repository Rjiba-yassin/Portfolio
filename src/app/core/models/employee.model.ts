export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dob: string;
  hireDate: string;
  department: string;
  position: string;
  salary: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  imageUrl?: string;
}