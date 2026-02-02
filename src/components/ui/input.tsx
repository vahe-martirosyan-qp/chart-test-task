import * as React from 'react';
import styled from 'styled-components';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  $error?: boolean;
}

const StyledInput = styled.input<{ $error?: boolean }>`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => (props.$error ? 'hsl(var(--destructive))' : 'hsl(var(--input))')};
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &::file-selector-button {
    border: 0;
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--foreground));
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    outline: none;
    border-color: ${(props) => (props.$error ? 'hsl(var(--destructive))' : 'hsl(var(--ring))')};
    box-shadow: 0 0 0 2px
      ${(props) => (props.$error ? 'hsl(var(--destructive) / 0.2)' : 'hsl(var(--ring) / 0.2)')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ $error, type, ...props }, ref) => {
  return <StyledInput type={type} $error={$error} ref={ref} {...props} />;
});
Input.displayName = 'Input';

export { Input };
