import { ChartBar, ChartColumn, LineChart } from "lucide-react";
import { Button } from "../ui/button";

export const CHART_TYPES = [
  { label: "Line", value: "line", icon: LineChart },
  { label: "Column", value: "column", icon: ChartColumn },
  { label: "Bar", value: "bar", icon: ChartBar },
] as const;

export type ChartType = (typeof CHART_TYPES)[number]["value"];

export function ChangeChartType({
  value,
  setValue,
}: {
  value: ChartType;
  setValue: (v: ChartType) => void;
}) {
  return (
    <div className="flex gap-1 ml-auto" role="group" aria-label="Chart type">
      {CHART_TYPES.map((type) => {
        const Icon = type.icon;
        return (
          <Button
            key={type.value}
            variant="outline"
            type="button"
            className={`px-1 py-1 rounded-md border text-xs font-medium  focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center
              ${
                value === type.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-muted text-muted-foreground hover:bg-accent"
              }
            `}
            aria-pressed={value === type.value}
            aria-label={type.label + " chart"}
            onClick={() => setValue(type.value)}
          >
            <Icon />
          </Button>
        );
      })}
    </div>
  );
}
