import { Loading } from "@/components/loading/loading";

export const ChartLoading = () => {
  return (
    <div className="space-y-6 w-full h-96 mx-auto p-0">
      {Array.from({ length: 7 }).map((_, index) => (
        <Loading key={index} type="rect" width="100%" height={32} />
      ))}
    </div>
  );
};
