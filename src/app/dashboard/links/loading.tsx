import { TableSkeleton } from "@/components/ui/loading-skeleton";

export default function LinksLoading() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment Links</h1>
        <p className="text-gray-600 mt-2">Loading payment links...</p>
      </div>
      <TableSkeleton rows={8} />
    </div>
  );
}
