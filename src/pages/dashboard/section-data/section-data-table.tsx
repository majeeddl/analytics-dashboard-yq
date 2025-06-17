import { DataTable } from "@/components/table/data-table";
import { FeedbackButton } from "@/components/shared/feedback-button";
import type { ColumnDef } from "@tanstack/react-table";

type SectionRow = {
  location: string;
  waitTime: number;
  workforceUtilization: number;
  staffCount: number;
  staffNames: string;
};

const SectionDataTable = () => {
  const columns: ColumnDef<SectionRow>[] = [
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Wait Time",
      accessorKey: "waitTime",
    },
    {
      header: "Workforce Util",
      accessorKey: "workforceUtilization",
    },
    {
      header: "Staff Count",
      accessorKey: "staffCount",
    },
    {
      header: "Staff Names",
      accessorKey: "staffNames",
    },
  ];

  const data: SectionRow[] = [
    {
      location: "Entrance Section",
      waitTime: 14,
      workforceUtilization: 40,
      staffCount: 2,
      staffNames: "Alice Alistair, Bob Bastion",
    },
    {
      location: "Checkout Section",
      waitTime: 178,
      workforceUtilization: 20,
      staffCount: 1,
      staffNames: "Chair Colster",
    },
    {
      location: "Support Desk",
      waitTime: 273,
      workforceUtilization: 40,
      staffCount: 2,
      staffNames: "Dave Deportes, Eny Ellior",
    },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      title="Section Data"
      toolbarRight={<FeedbackButton className="  right-2" />}
    />
  );
};

export default SectionDataTable;
