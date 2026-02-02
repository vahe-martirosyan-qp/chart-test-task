import * as React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  font-size: 0.875rem;
  caption-side: bottom;
`;

const TableHeader = styled.thead`
  & tr {
    border-bottom: 1px solid hsl(var(--border));
  }
`;

const TableBody = styled.tbody`
  & tr:last-child {
    border-bottom: 0;
  }
`;

const TableFooter = styled.tfoot`
  border-top: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.5);
  font-weight: 500;

  & > tr:last-child {
    border-bottom: 0;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid hsl(var(--border));
  transition: background-color 0.2s;

  &:hover {
    background-color: hsl(var(--muted) / 0.5);
  }

  &[data-state='selected'] {
    background-color: hsl(var(--muted));
  }
`;

const TableHead = styled.th`
  height: 3rem;
  padding: 0 1rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
  color: hsl(var(--muted-foreground));

  &:has([role='checkbox']) {
    padding-right: 0;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;

  &:has([role='checkbox']) {
    padding-right: 0;
  }
`;

const TableCaption = styled.caption`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ ...props }, ref) => (
    <TableWrapper>
      <StyledTable ref={ref} {...props} />
    </TableWrapper>
  )
);
Table.displayName = 'Table';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
