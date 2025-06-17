import { render, screen } from "@testing-library/react";
import { Chart } from "./chart";
import type { ChartProps, ChartType } from "./chart";
import type { PropsWithChildren } from "react";
// Mock recharts components to avoid rendering SVGs in test
import { vi, describe, it, expect } from "vitest";
vi.mock("recharts", () => {
  return {
    LineChart: (props: PropsWithChildren<object>) => (
      <div data-testid="LineChart">{props.children}</div>
    ),
    Line: (props: PropsWithChildren<object>) => (
      <div data-testid="Line">{props.children}</div>
    ),
    CartesianGrid: () => <div data-testid="CartesianGrid" />,
    XAxis: () => <div data-testid="XAxis" />,
    YAxis: () => <div data-testid="YAxis" />,
    BarChart: (props: PropsWithChildren<object>) => (
      <div data-testid="BarChart">{props.children}</div>
    ),
    Bar: (props: PropsWithChildren<object>) => (
      <div data-testid="Bar">{props.children}</div>
    ),
    LabelList: () => <div data-testid="LabelList" />,
    PieChart: (props: PropsWithChildren<object>) => (
      <div data-testid="PieChart">{props.children}</div>
    ),
    Pie: (props: PropsWithChildren<object>) => (
      <div data-testid="Pie">{props.children}</div>
    ),
  };
});

// Mock ChartContainer, ChartTooltip, ChartLegend, etc.
vi.mock("../ui/chart", () => ({
  ChartContainer: (props: PropsWithChildren<object>) => (
    <div data-testid="ChartContainer">{props.children}</div>
  ),
  ChartLegend: (props: PropsWithChildren<object>) => (
    <div data-testid="ChartLegend">{props.children}</div>
  ),
  ChartLegendContent: () => <div data-testid="ChartLegendContent" />,
  ChartTooltip: (props: PropsWithChildren<object>) => (
    <div data-testid="ChartTooltip">{props.children}</div>
  ),
  ChartTooltipContent: () => <div data-testid="ChartTooltipContent" />,
}));

vi.mock("./chart-loading", () => ({
  ChartLoading: () => <div data-testid="ChartLoading" />,
}));

const baseProps: Omit<ChartProps, "chartType"> = {
  loading: false,
  data: [{ x: 1, y: 2, locationName: "A", value: 0.5 }],
  chartConfig: { A: { color: "#000", label: "A" } },
  xAxisProps: {},
  yAxisProps: {},
  graphProps: { dataKey: "y", name: "A", nameKey: "locationName" },
};

describe("Chart", () => {
  it("renders loading state", () => {
    render(<Chart {...baseProps} loading={true} chartType="line" />);
    expect(screen.getByTestId("ChartLoading")).toBeInTheDocument();
  });

  it.each([
    ["line", "LineChart"],
    ["bar", "BarChart"],
    ["column", "BarChart"],
    ["pie", "PieChart"],
  ] as [ChartType, string][])("renders %s chart", (type, chartTestId) => {
    render(<Chart {...baseProps} chartType={type} />);
    expect(screen.getByTestId("ChartContainer")).toBeInTheDocument();
    expect(screen.getByTestId(chartTestId)).toBeInTheDocument();
  });

  it("renders pie chart with percentage label", () => {
    render(
      <Chart
        {...baseProps}
        chartType="pie"
        graphProps={{
          ...baseProps.graphProps,
          percentage: true,
          dataKey: "value",
        }}
      />
    );
    expect(screen.getByTestId("PieChart")).toBeInTheDocument();
    expect(screen.getByTestId("Pie")).toBeInTheDocument();
  });
});
