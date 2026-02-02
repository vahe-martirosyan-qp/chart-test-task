import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import styled from 'styled-components';

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<string, string> })
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

const StyledChartContainer = styled.div<{ $height?: string }>`
  width: 100%;
  font-size: 0.75rem;
  min-height: ${(props) => props.$height || '300px'};
  height: 100%;
  overflow: visible;

  .recharts-cartesian-axis-tick-text {
    fill: hsl(var(--muted-foreground));
  }

  .recharts-cartesian-grid-line[stroke='#ccc'] {
    stroke: hsl(var(--border) / 0.5);
  }

  .recharts-curve.recharts-tooltip-cursor {
    stroke: hsl(var(--border));
  }

  .recharts-dot[stroke='#fff'] {
    stroke: transparent;
  }

  .recharts-layer {
    outline: none;
  }

  .recharts-polar-grid_[stroke='#ccc'] {
    stroke: hsl(var(--border));
  }

  .recharts-radial-bar-background-sector {
    fill: hsl(var(--muted));
  }

  .recharts-rectangle.recharts-tooltip-drag-offset {
    stroke: hsl(var(--border));
  }

  .recharts-reference-line-line {
    stroke: hsl(var(--border));
  }

  .recharts-sector[stroke='#fff'] {
    stroke: transparent;
  }

  .recharts-sector {
    outline: none;
  }

  .recharts-surface {
    outline: none;
    overflow: visible;
  }

  .recharts-wrapper {
    overflow: visible !important;
  }

  .recharts-pie-label-text {
    fill: #1a1a1a;
    font-size: 12px;
    font-weight: 500;
  }

  .recharts-pie-label-line {
    stroke: #6b7280;
    stroke-width: 1;
  }
`;

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
    height?: string;
  }
>(({ id, height, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <StyledChartContainer data-chart={chartId} ref={ref} $height={height} {...props}>
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </StyledChartContainer>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'Chart';

const ChartTooltip = RechartsPrimitive.Tooltip;

const TooltipContainer = styled.div`
  display: grid;
  min-width: 8rem;
  align-items: start;
  gap: 0.375rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border) / 0.5);
  background-color: hsl(var(--background));
  padding: 0.625rem 0.625rem;
  font-size: 0.75rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const TooltipLabel = styled.div`
  font-weight: 500;
`;

const TooltipItem = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.5rem;
`;

const TooltipIndicator = styled.div<{ $color?: string; $type?: string }>`
  flex-shrink: 0;
  border-radius: 2px;
  border: 1px solid ${(props) => props.$color || 'transparent'};
  background-color: ${(props) => props.$color || 'transparent'};
  height: ${(props) =>
    props.$type === 'dot' ? '0.625rem' : props.$type === 'line' ? '0.25rem' : '0'};
  width: ${(props) =>
    props.$type === 'dot' ? '0.625rem' : props.$type === 'line' ? '0.25rem' : '0'};
  ${(props) =>
    props.$type === 'dashed' ? 'border: 1.5px dashed; background-color: transparent;' : ''}
`;

const TooltipValue = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const TooltipValueText = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 500;
  tab-size: 4;
  color: hsl(var(--foreground));
`;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    active?: boolean;
    payload?: Array<{
      name?: string;
      value?: number | string;
      dataKey?: string;
      color?: string;
      payload?: any;
    }>;
    label?: any;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
    labelFormatter?: (value: any, payload: any[]) => React.ReactNode;
    formatter?: (value: any, name: any, item: any, index: number, payload: any) => React.ReactNode;
    color?: string;
  }
>(
  (
    {
      active,
      payload = [],
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload || payload.length === 0) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || 'value'}`;
      const itemConfig = config[key as keyof typeof config];
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <TooltipLabel>{labelFormatter(value, payload)}</TooltipLabel>;
      }

      if (!value) {
        return null;
      }

      return <TooltipLabel>{value}</TooltipLabel>;
    }, [label, labelFormatter, payload, hideLabel, config, labelKey]);

    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <TooltipContainer ref={ref}>
        {!nestLabel ? tooltipLabel : null}
        <div>
          {payload.map((item: any, index: number) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = config[key as keyof typeof config];
            const indicatorColor = color || item.payload?.fill || item.color;

            return (
              <TooltipItem key={item.dataKey}>
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {!hideIndicator && (
                      <TooltipIndicator $color={indicatorColor} $type={indicator} />
                    )}
                    <TooltipValue>
                      <div>
                        {nestLabel ? tooltipLabel : null}
                        <span>{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <TooltipValueText>{item.value.toLocaleString()}</TooltipValueText>
                      )}
                    </TooltipValue>
                  </>
                )}
              </TooltipItem>
            );
          })}
        </div>
      </TooltipContainer>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltip';

const ChartLegend = RechartsPrimitive.Legend;

const LegendContainer = styled.div<{ $verticalAlign?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-top: ${(props) => (props.$verticalAlign === 'top' ? '0' : '0.75rem')};
  padding-bottom: ${(props) => (props.$verticalAlign === 'top' ? '0.75rem' : '0')};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const LegendIcon = styled.div<{ $color?: string }>`
  height: 0.5rem;
  width: 0.5rem;
  flex-shrink: 0;
  border-radius: 2px;
  background-color: ${(props) => props.$color || 'transparent'};
`;

const LegendText = styled.span`
  color: hsl(var(--muted-foreground));
`;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    hideIcon?: boolean;
    nameKey?: string;
    payload?: Array<{ value?: string; dataKey?: string; color?: string }>;
    verticalAlign?: string;
  }
>(({ hideIcon = false, payload = [], verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart();

  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <LegendContainer ref={ref} $verticalAlign={verticalAlign}>
      {payload.map((item: any, index: number) => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = config[key as keyof typeof config];

        return (
          <LegendItem key={item.value || index}>
            {!hideIcon && <LegendIcon $color={item.color} />}
            <LegendText>{itemConfig?.label || item.value}</LegendText>
          </LegendItem>
        );
      })}
    </LegendContainer>
  );
});
ChartLegendContent.displayName = 'ChartLegend';

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent };
