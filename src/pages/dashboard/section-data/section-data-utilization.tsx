import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loading } from "@/components/loading/loading";
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

export function SectionDataUtilizationChart() {
  const [data, setData] = React.useState<SectionData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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

  const utilizationConfig = data.reduce(
    (acc, curr) => {
      return {
        ...acc,
        totalTime: acc.totalTime + curr.metrics.workForceUtilization.total,
        config: {
          ...acc.config,
          [curr.locationName]: {
            label: curr.locationName,
          },
        },
      };
    },
    {
      totalTime: 0,
      config: {
        utilization: {
          label: "Utilization",
        },
      },
    }
  );

  const colors = [
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-2)",
    "var(--chart-1)",
  ];
  const utilizationChartData = data.map((section) => {
    return {
      locationName: section.locationName,
      utilization: Number(
        (
          section.metrics.workForceUtilization.total /
          utilizationConfig.totalTime
        ).toFixed(2)
      ),
      fill: colors.pop(),
    };
  });

  return (
    <Card className="w-full h-120">
      <CardHeader className="flex flex-row items-center gap-2 h-30  ">
        <CardTitle className="flex-1">Utilization per Section (%)</CardTitle>
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
            data={utilizationChartData}
            chartConfig={utilizationConfig.config}
            chartType={"pie"}
            graphProps={{
              dataKey: "utilization",
              nameKey: "locationName",
              name: "Utilization",
              percentage: true,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default SectionDataUtilizationChart;
