import type { Employee } from '../../types/employee';
import { EmployeeForm } from '../EmployeeForm/EmployeeForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
}

export const EmployeeDialog = ({
  open,
  onOpenChange,
  employee,
  onSubmit,
}: EmployeeDialogProps) => {
  const handleSubmit = (employeeData: Omit<Employee, 'id'>) => {
    onSubmit(employeeData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{employee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
          <DialogDescription>
            {employee ? 'Update employee information' : 'Add a new employee to the system'}
          </DialogDescription>
        </DialogHeader>
        <EmployeeForm employee={employee} onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
};
