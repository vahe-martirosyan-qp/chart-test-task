import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import styled from 'styled-components';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  departmentFilter: string;
  onDepartmentFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  departments: string[];
}

const FilterBarContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Search = styled.div`
  flex: 0 0 auto;
  width: 300px;
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 12px;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export const FilterBar = ({
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  statusFilter,
  onStatusFilterChange,
  departments,
}: FilterBarProps) => {
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...departments.map((dept) => ({ value: dept, label: dept })),
  ];

  return (
    <FilterBarContainer>
      <Search>
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Search>
      <Filters>
        <Select value={departmentFilter} onValueChange={onDepartmentFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            {departmentOptions.map((dept) => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Filters>
    </FilterBarContainer>
  );
};
