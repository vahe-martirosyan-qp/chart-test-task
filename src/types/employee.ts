export interface Employee {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
  status: 'active' | 'inactive';
}

export type EmployeeStatus = 'active' | 'inactive';

export type SortField = 'name' | 'email' | 'age' | 'department' | 'status';
export type SortDirection = 'asc' | 'desc';
