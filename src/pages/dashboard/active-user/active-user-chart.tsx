import * as React from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChangeChartType,
  type ChartType,
} from "@/components/charts/change-chart-type";
import { Chart } from "@/components/charts/chart";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { parseISO, format, startOfWeek, startOfMonth } from "date-fns";
import { FeedbackButton } from "@/components/shared/feedback-button";
import { getSectionDataEndpoint } from "@/utils/api.util";

// Data type for active users
type ActiveUser = {
  timeBucket: string; // ISO string
  value: number;
};

export function ActiveUserChart() {
  const [data, setData] = React.useState<ActiveUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [chartType, setChartType] = React.useState<ChartType>("line");
  const [timeframe, setTimeframe] = React.useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    const endpoint = getSectionDataEndpoint();

    fetch(endpoint + "/activeUsers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch active users");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Group data by timeframe
  const groupedData = React.useMemo(() => {
    if (timeframe === "daily") return data;
    const grouped: Record<string, number[]> = {};
    data.forEach(({ timeBucket, value }) => {
      let key: string;
      if (timeframe === "weekly") {
        key = format(startOfWeek(parseISO(timeBucket)), "yyyy-MM-dd");
      } else {
        key = format(startOfMonth(parseISO(timeBucket)), "yyyy-MM");
      }
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(value);
    });
    return Object.entries(grouped).map(([timeBucket, values]) => ({
      timeBucket,
      value: Math.round(values.reduce((a, b) => a + b, 0) / values.length), // average
    }));
  }, [data, timeframe]);

  // Chart config for shadcn chart
  const chartConfig = {
    "Active Users": {
      label: "Active Users",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center gap-2">
        <CardTitle className="flex-1">Active Users Over Time</CardTitle>
        <div className="flex gap-2 items-center">
          <Select
            value={timeframe}
            onValueChange={(v) =>
              setTimeframe(v as "daily" | "weekly" | "monthly")
            }
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <ChangeChartType value={chartType} setValue={setChartType} />
          <FeedbackButton className="  right-2" />
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex justify-center items-center h-64 text-red-500">
            {error}
          </div>
        ) : (
          <Chart
            loading={loading}
            data={groupedData}
            chartConfig={chartConfig}
            chartType={chartType}
            xAxisProps={{
              dataKey: "timeBucket",
              tickFormatter: (iso) => {
                if (timeframe === "daily")
                  return new Date(iso).toLocaleDateString();
                if (timeframe === "weekly")
                  return `Week of ${new Date(iso).toLocaleDateString()}`;
                if (timeframe === "monthly")
                  return format(parseISO(iso + "-01"), "MMMM yyyy");
                return iso;
              },
            }}
            yAxisProps={{
              dataKey: "value",
            }}
            graphProps={{
              dataKey: "value",
              name: "Active Users",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default ActiveUserChart;
