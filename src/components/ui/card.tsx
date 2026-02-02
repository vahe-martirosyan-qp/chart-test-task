import styled from 'styled-components';

const Card = styled.div`
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1rem 1.5rem 0.5rem 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.025em;
`;

const CardContent = styled.div`
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`;

export { Card, CardHeader, CardTitle, CardContent };
