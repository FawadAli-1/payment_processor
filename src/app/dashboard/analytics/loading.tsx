import { CardSkeleton } from "@/components/ui/loading-skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Loading your business insights...</p>
      </div>
      
      {/* Period selector skeleton */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {["7", "30", "90"].map((period) => (
            <div key={period} className="h-10 w-16 bg-gray-200 rounded-md animate-pulse" />
          ))}
        </div>
      </div>

      {/* Metrics cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Charts and tables skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Recent activity skeleton */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
