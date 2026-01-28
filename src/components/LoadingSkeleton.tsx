import { cn } from '@/utils/helpers';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("skeleton-shimmer rounded", className)} />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="stat-card rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-8 w-32" />
          <LoadingSkeleton className="h-4 w-40" />
        </div>
        <LoadingSkeleton className="w-12 h-12 rounded-xl" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <LoadingSkeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function ChartSkeleton() {
  return (
    <div className="stat-card rounded-xl p-6">
      <LoadingSkeleton className="h-5 w-40 mb-4" />
      <LoadingSkeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}
