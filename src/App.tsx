import { useState, useMemo } from 'react';
import type { Employee, SortField, SortDirection } from './types/employee';
import { mockEmployees } from './data/mockEmployees';
import { Analytics } from './components/Analytics/Analytics';
import { EmployeeDialog } from './components/EmployeeDialog/EmployeeDialog';
import { FilterBar } from './components/FilterBar/FilterBar';
import { Table } from './components/Table/Table';
import { Button } from './components/ui/button';
import { Plus, Edit2 } from 'lucide-react';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Content = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const StatusBadge = styled.span<{ $status: 'active' | 'inactive' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => (props.$status === 'active' ? '#d1fae5' : '#fee2e2')};
  color: ${(props) => (props.$status === 'active' ? '#065f46' : '#991b1b')};
`;

function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const departments = useMemo(() => {
    const deptSet = new Set(employees.map((emp) => emp.department));
    return Array.from(deptSet).sort();
  }, [employees]);

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
      const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
      return matchesSearch && matchesDepartment && matchesStatus;
    });

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const comparison =
          typeof aValue === 'string' && typeof bValue === 'string'
            ? aValue.localeCompare(bValue)
            : (aValue as number) - (bValue as number);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [employees, searchTerm, departmentFilter, statusFilter, sortField, sortDirection]);

  const handleAddEmployee = () => {
    setEditingEmployee(undefined);
    setIsDialogOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
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

  const handleSort = (field: string, direction: SortDirection) => {
    setSortField(field as SortField);
    setSortDirection(direction);
  };

  const getStatusBadge = (status: string) => {
    return (
      <StatusBadge $status={status as 'active' | 'inactive'}>
        {status === 'active' ? 'Active' : 'Not Active'}
      </StatusBadge>
    );
  };

  const columns = [
    {
      key: 'name' as const,
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email' as const,
      label: 'Email',
      sortable: true,
    },
    {
      key: 'age' as const,
      label: 'Age',
      sortable: true,
    },
    {
      key: 'department' as const,
      label: 'Department',
      sortable: true,
    },
    {
      key: 'status' as const,
      label: 'Status',
      sortable: true,
      render: (_: any, row: Employee) => getStatusBadge(row.status),
    },
    {
      key: 'actions' as const,
      label: 'Actions',
      sortable: false,
      render: (_: any, row: Employee) => (
        <Button variant="outline" size="sm" onClick={() => handleEditEmployee(row)}>
          <Edit2 className="h-4 w-4" />
          Edit
        </Button>
      ),
    },
  ];

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

      <Content>
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          departments={departments}
        />

        <Table
          columns={columns}
          data={filteredAndSortedEmployees}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </Content>

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
