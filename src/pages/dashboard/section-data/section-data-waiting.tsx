import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loading } from "@/components/loading/loading";
import { ChangeChartType } from "@/components/charts/change-chart-type";
import { Chart } from "@/components/charts/chart";
import { FeedbackButton } from "@/components/shared/feedback-button";
import { getSectionDataEndpoint } from "@/utils/api.util";

// Types for section data
interface SectionData {
  locationName: string;
  metrics: {
    waitTimeSeconds: number;
    workForceUtilization: {
      total: number;
      persons: { firstName: string; lastName: string }[];
    };
  };
}

export function SectionDataWaitingChart() {
  const [data, setData] = React.useState<SectionData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [waitTimeOrientation, setWaitTimeOrientation] = React.useState<
    "line" | "column" | "bar"
  >("column");

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    const endpoint = getSectionDataEndpoint();
    fetch(endpoint + "/sectionData")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch section data");
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

  const chartData = data.map((section) => ({
    locationName: section.locationName,
    waitTimeSeconds: section.metrics.waitTimeSeconds,
    color: "var(--color-chart-1)",
  }));

  const waitTimeConfig = {
    waitTimeSeconds: {
      label: "Avg. Wait Time (s)",
      color: "var(--color-chart-1)",
    },
  };

  return (
    <Card className="w-full h-120">
      <CardHeader className="flex flex-row items-center gap-2 h-30">
        <CardTitle className="flex-1">Average Wait Time per Section</CardTitle>
        <ChangeChartType
          value={waitTimeOrientation}
          setValue={setWaitTimeOrientation}
        />
        <FeedbackButton className="  right-2" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loading height="16rem" />
        ) : error ? (
          <div className="flex justify-center items-center h-64 text-red-500">
            {error}
          </div>
        ) : (
          <Chart
            loading={loading}
            data={chartData}
            chartConfig={waitTimeConfig}
            chartType={waitTimeOrientation}
            xAxisProps={{
              dataKey: "locationName",
            }}
            yAxisProps={{
              dataKey: "waitTimeSeconds",
            }}
            graphProps={{
              dataKey: "waitTimeSeconds",
              name: "Avg. Wait Time (s)",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default SectionDataWaitingChart;
