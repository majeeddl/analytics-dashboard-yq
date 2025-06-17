import { Loading } from "@/components/loading/loading";
import React, { Suspense } from "react";

const ActiveUserChart = React.lazy(
  () => import("@/pages/dashboard/active-user/active-user-chart")
);
const SectionDataWaitingChart = React.lazy(
  () => import("@/pages/dashboard/section-data/section-data-waiting")
);
const SectionDataUtilizationChart = React.lazy(
  () => import("@/pages/dashboard/section-data/section-data-utilization")
);
const SectionDataTable = React.lazy(
  () => import("@/pages/dashboard/section-data/section-data-table")
);

export default function DashboardPage() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full">
        <div className="relative">
          <Suspense fallback={<Loading height="16rem" />}>
            <ActiveUserChart />
          </Suspense>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-3">
        <div className="relative">
          <Suspense fallback={<Loading height="16rem" />}>
            <SectionDataWaitingChart />
          </Suspense>
        </div>
        <div className="relative">
          <Suspense fallback={<Loading height="16rem" />}>
            <SectionDataUtilizationChart />
          </Suspense>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full pt-3">
        <div className="relative">
          <Suspense fallback={<Loading height="16rem" />}>
            <SectionDataTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
