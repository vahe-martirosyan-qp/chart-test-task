import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import styled from 'styled-components';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const StyledSelectTrigger = styled(SelectPrimitive.Trigger)<{ $error?: boolean }>`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => (props.$error ? 'hsl(var(--destructive))' : 'hsl(var(--input))')};
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? 'hsl(var(--destructive))' : 'hsl(var(--ring))')};
    box-shadow: 0 0 0 2px
      ${(props) => (props.$error ? 'hsl(var(--destructive) / 0.2)' : 'hsl(var(--ring) / 0.2)')};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  & > span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
  width: 1rem;
  opacity: 0.5;
`;

const SelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0;
`;

const SelectScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0;
`;

const StyledSelectContent = styled(SelectPrimitive.Content)<{ $position?: string }>`
  position: relative;
  z-index: 50;
  max-height: 24rem;
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  ${(props) =>
    props.$position === 'popper'
      ? `
    &[data-side="bottom"] {
      transform: translateY(0.25rem);
    }
    &[data-side="left"] {
      transform: translateX(-0.25rem);
    }
    &[data-side="right"] {
      transform: translateX(0.25rem);
    }
    &[data-side="top"] {
      transform: translateY(-0.25rem);
    }
  `
      : ''}
`;

const SelectViewport = styled(SelectPrimitive.Viewport)<{ $position?: string }>`
  padding: 0.25rem;

  ${(props) =>
    props.$position === 'popper'
      ? `
    height: var(--radix-select-trigger-height);
    width: 100%;
    min-width: var(--radix-select-trigger-width);
  `
      : ''}
`;

const SelectLabel = styled(SelectPrimitive.Label)`
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  font-weight: 600;
`;

const StyledSelectItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  & > span:first-child {
    position: absolute;
    left: 0.5rem;
    display: flex;
    height: 0.875rem;
    width: 0.875rem;
    align-items: center;
    justify-content: center;
  }
`;

const SelectSeparator = styled(SelectPrimitive.Separator)`
  margin: 0.25rem -0.25rem;
  height: 1px;
  background-color: hsl(var(--muted));
`;

const SelectTriggerComponent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { $error?: boolean }
>(({ children, $error, ...props }, ref) => (
  <StyledSelectTrigger ref={ref} $error={$error} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <IconWrapper>
        <ChevronDown size={16} />
      </IconWrapper>
    </SelectPrimitive.Icon>
  </StyledSelectTrigger>
));
SelectTriggerComponent.displayName = SelectPrimitive.Trigger.displayName;

const SelectContentComponent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <StyledSelectContent ref={ref} $position={position} {...props}>
      <SelectScrollUpButton>
        <ChevronUp size={16} />
      </SelectScrollUpButton>
      <SelectViewport $position={position}>{children}</SelectViewport>
      <SelectScrollDownButton>
        <ChevronDown size={16} />
      </SelectScrollDownButton>
    </StyledSelectContent>
  </SelectPrimitive.Portal>
));
SelectContentComponent.displayName = SelectPrimitive.Content.displayName;

const SelectItemComponent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <StyledSelectItem ref={ref} {...props}>
    <span>
      <SelectPrimitive.ItemIndicator>
        <Check size={16} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </StyledSelectItem>
));
SelectItemComponent.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

export const SelectTrigger = SelectTriggerComponent;
export const SelectContent = SelectContentComponent;
export const SelectItem = SelectItemComponent;
