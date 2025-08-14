import { TableSkeleton } from "@/components/ui/loading-skeleton";

export default function CustomersLoading() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-2">Loading customer data...</p>
      </div>
      <TableSkeleton rows={10} />
    </div>
  );
}
