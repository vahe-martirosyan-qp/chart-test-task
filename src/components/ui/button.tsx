import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const StyledButton = styled.button<{ $variant?: string; $size?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: colors 0.2s;
  outline: none;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    ring: 2px;
    ring-color: hsl(var(--ring));
    ring-offset: 2px;
    ring-offset-color: hsl(var(--background));
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  ${(props) => {
    switch (props.$variant) {
      case 'outline':
        return `
          border: 1px solid hsl(var(--input));
          background-color: hsl(var(--background));
          &:hover:not(:disabled) {
            background-color: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }
        `;
      case 'ghost':
        return `
          &:hover:not(:disabled) {
            background-color: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }
        `;
      default:
        return `
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          &:hover:not(:disabled) {
            background-color: hsl(var(--primary) / 0.9);
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return `
          height: 2.25rem;
          padding: 0 0.75rem;
          border-radius: 0.375rem;
        `;
      case 'lg':
        return `
          height: 2.75rem;
          padding: 0 2rem;
          border-radius: 0.375rem;
        `;
      case 'icon':
        return `
          height: 2.5rem;
          width: 2.5rem;
        `;
      default:
        return `
          height: 2.5rem;
          padding: 0.5rem 1rem;
        `;
    }
  }}
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : StyledButton;
    return <Comp $variant={variant} $size={size} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button };
