import { useMemo } from 'react';
import type { Employee } from '../../types/employee';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from '../ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import styled from 'styled-components';

interface AnalyticsProps {
  employees: Employee[];
}

const AnalyticsContainer = styled.div`
  margin-bottom: 32px;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled(Card)`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
`;

const CardTitleText = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
`;

const CardValue = styled.div<{ $variant?: 'success' | 'warning' }>`
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  color: ${(props) => {
    if (props.$variant === 'success') return '#10b981';
    if (props.$variant === 'warning') return '#f59e0b';
    return '#1a1a1a';
  }};
`;

const ChartCard = styled(Card)<{ $span?: number }>`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  grid-column: ${(props) => (props.$span ? `span ${props.$span}` : 'span 1')};
  display: flex;
  flex-direction: column;
  overflow: visible;

  ${CardHeader} {
    padding: 1rem 1.5rem 0.5rem 1.5rem;
  }

  ${CardContent} {
    padding: 0.5rem 1.5rem 1rem 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: visible;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const chartConfig = {
  department: {
    label: 'Employees',
  },
  active: {
    label: 'Active',
    color: 'hsl(142, 76%, 36%)',
  },
  inactive: {
    label: 'Inactive',
    color: 'hsl(38, 92%, 50%)',
  },
} satisfies Record<string, { label: string; color?: string }>;

export const Analytics = ({ employees }: AnalyticsProps) => {
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === 'active').length;
    const inactive = total - active;

    const departmentCounts = employees.reduce(
      (acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const departmentData = Object.entries(departmentCounts).map(([name, value]) => ({
      name,
      department: value,
    }));

    const statusData = [
      { name: 'Active', value: active, fill: 'hsl(142, 76%, 36%)' },
      { name: 'Inactive', value: inactive, fill: 'hsl(38, 92%, 50%)' },
    ];

    return {
      total,
      active,
      inactive,
      departmentData,
      statusData,
    };
  }, [employees]);

  return (
    <AnalyticsContainer>
      <Header>
        <Title>Employee Analytics</Title>
      </Header>
      <Grid>
        <StyledCard>
          <CardTitleText>Total Employees</CardTitleText>
          <CardValue>{stats.total}</CardValue>
        </StyledCard>
        <StyledCard>
          <CardTitleText>Active Employees</CardTitleText>
          <CardValue $variant="success">{stats.active}</CardValue>
        </StyledCard>
        <StyledCard>
          <CardTitleText>Inactive Employees</CardTitleText>
          <CardValue $variant="warning">{stats.inactive}</CardValue>
        </StyledCard>
        <ChartCard $span={2}>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} height="280px">
              <BarChart
                data={stats.departmentData}
                margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend />
                <Bar dataKey="department" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </ChartCard>
        <ChartCard>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} height="280px">
              <PieChart>
                <Pie
                  data={stats.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => {
                    const percentage = ((percent ?? 0) * 100).toFixed(0);
                    return `${name}: ${percentage}%`;
                  }}
                  outerRadius={70}
                  innerRadius={0}
                  dataKey="value"
                >
                  {stats.statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={stats.statusData[index].fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </ChartCard>
      </Grid>
    </AnalyticsContainer>
  );
};
