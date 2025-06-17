import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  LabelList,
  PieChart,
  type YAxisProps,
  type XAxisProps,
  type PieProps,
  type BarProps,
  type LineProps,
  Pie,
} from "recharts";
import { ChartLoading } from "./chart-loading";

export type ChartType = "line" | "bar" | "column" | "pie";

export type ChartProps = {
  loading: boolean;
  data: unknown[];
  chartConfig: ChartConfig;
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  chartType: ChartType;
  graphProps?: (LineProps | BarProps | PieProps) & {
    percentage?: boolean;
    nameKey?: string;
  };
};

export const Chart = ({
  loading,
  data,
  chartConfig,
  xAxisProps,
  yAxisProps,
  chartType,
  graphProps,
}: ChartProps) => {
  if (loading) {
    return <ChartLoading />;
  }

  if (chartType === "line") {
    return (
      <ChartContainer config={chartConfig} className="w-full h-96">
        <LineChart
          data={data}
          margin={{ top: 24, right: 32, left: 8, bottom: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            minTickGap={24}
            padding={{ left: 30, right: 30 }}
            {...xAxisProps}
          />
          <YAxis
            allowDecimals={false}
            padding={{ top: 16, bottom: 16 }}
            {...yAxisProps}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey={graphProps?.dataKey as string}
            name={graphProps?.name as string}
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          >
            <LabelList
              dataKey={graphProps?.dataKey || ""}
              position="top"
              offset={12}
              fontSize={12}
              className="fill-foreground"
            />
          </Line>
        </LineChart>
      </ChartContainer>
    );
  }

  if (chartType === "column") {
    return (
      <ChartContainer config={chartConfig} className="w-full h-96">
        <BarChart
          data={data}
          margin={{ top: 24, right: 32, left: 8, bottom: 24 }}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            width={120}
            tick={{ width: 100 }}
            {...xAxisProps}
          />
          <YAxis type="number" allowDecimals={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey={graphProps?.dataKey as string}
            name={graphProps?.name as string}
            fill={
              chartConfig[graphProps?.name as string]?.color || "var(--chart-1)"
            }
            radius={[8, 8, 0, 0]}
          >
            <LabelList
              dataKey={graphProps?.dataKey as string}
              position="top"
              fontSize={12}
              className="fill-foreground"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    );
  }

  if (chartType === "bar") {
    return (
      <ChartContainer config={chartConfig} className="w-full h-96">
        <BarChart
          data={data}
          margin={{ top: 24, right: 32, left: 8, bottom: 24 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            type="category"
            width={120}
            tick={{ width: 100 }}
            {...(xAxisProps as YAxisProps)}
          />
          <XAxis
            type="number"
            allowDecimals={false}
            {...(yAxisProps as XAxisProps)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey={graphProps?.dataKey || ""}
            name={graphProps?.name || ""}
            fill="var(--color-chart-1)"
            radius={[8, 8, 0, 0]}
          >
            <LabelList
              dataKey={graphProps?.dataKey || ""}
              position="right"
              fontSize={12}
              className="fill-foreground"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    );
  }

  if (chartType === "pie") {
    return (
      <ChartContainer
        config={chartConfig}
        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square h-100 pb-0 w-full"
      >
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                nameKey={graphProps?.nameKey as string}
                hideLabel
                formatter={(value) => {
                  if (Array.isArray(value)) {
                    return value.map((v) => v.toString()).join(", ");
                  }
                  if (typeof value === "number" && graphProps?.percentage) {
                    return `${(value * 100).toFixed(0)}%`;
                  }
                  return value != null ? value.toString() : "";
                }}
              />
            }
          />
          <Pie
            data={data}
            dataKey={graphProps?.dataKey as string}
            label={(props) => {
              if (graphProps?.percentage) {
                return `${(props.value * 100).toFixed(0)}%`;
              }
              return props.value;
            }}
            nameKey={graphProps?.nameKey as string}
          >
            {/* <LabelList
              dataKey="locationName"
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) => {
                if (graphProps?.percentage) {
                  return `(${value * 100}%)`;
                }
                return chartConfig[value]?.label;
              }}
            /> */}
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="locationName" />}
            className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
          />
        </PieChart>
      </ChartContainer>
    );
  }
};
