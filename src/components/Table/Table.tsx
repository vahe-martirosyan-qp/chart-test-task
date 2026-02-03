import type { ReactNode } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import styled from 'styled-components';

interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

const TableContainer = styled.div``;

const SortableHeader = styled(TableHead)`
  width: 1%;
  white-space: nowrap;
`;

const SortButton = styled(Button)`
  height: auto;
  padding: 0;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 12px;

  &:hover {
    color: hsl(var(--foreground));
  }
`;

const EmptyCell = styled(TableCell)`
  text-align: center;
  padding: 40px;
  color: hsl(var(--muted-foreground));
`;

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  onSort,
  sortField,
  sortDirection,
}: TableProps<T>) => {
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSort) return;

    const field = typeof column.key === 'string' ? column.key : String(column.key);
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;
    const field = typeof column.key === 'string' ? column.key : String(column.key);
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <TableContainer>
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            {columns.map((column) =>
              column.sortable ? (
                <SortableHeader key={String(column.key)}>
                  <SortButton variant="ghost" size="sm" onClick={() => handleSort(column)}>
                    {column.label}
                    {getSortIcon(column)}
                  </SortButton>
                </SortableHeader>
              ) : (
                <TableHead key={String(column.key)}>{column.label}</TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <EmptyCell colSpan={columns.length}>No employees found</EmptyCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => {
                  const value =
                    typeof column.key === 'string' ? row[column.key] : row[String(column.key)];
                  return (
                    <TableCell key={String(column.key)}>
                      {column.render ? column.render(value, row) : String(value ?? '')}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </ShadcnTable>
    </TableContainer>
  );
};
