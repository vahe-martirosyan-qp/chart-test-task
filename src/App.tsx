import { useState } from 'react';
import { Analytics } from './components/Analytics/Analytics';
import { mockEmployees } from './data/mockEmployees';
import { EmployeeDialog } from './components/EmployeeDialog/EmployeeDialog';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import styled from 'styled-components';
import type { Employee } from './types/employee';

const AppContainer = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
`;

function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();

  const handleAddEmployee = () => {
    setEditingEmployee(undefined);
    setIsDialogOpen(true);
  };

  const handleSubmitEmployee = (employeeData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...employeeData, id: editingEmployee.id } : emp
        )
      );
    } else {
      const newEmployee: Employee = {
        ...employeeData,
        id: Date.now().toString(),
      };
      setEmployees([...employees, newEmployee]);
    }
    setIsDialogOpen(false);
    setEditingEmployee(undefined);
  };

  return (
    <AppContainer>
      <Header>
        <Title>Employee Management</Title>
        <Button onClick={handleAddEmployee}>
          <Plus className="h-5 w-5" />
          Add New Employee
        </Button>
      </Header>
      <Analytics employees={employees} />
      <EmployeeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        employee={editingEmployee}
        onSubmit={handleSubmitEmployee}
      />
    </AppContainer>
  );
}

export default App;
