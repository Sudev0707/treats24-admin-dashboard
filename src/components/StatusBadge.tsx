import { cn, capitalize, getStatusColor } from '@/utils/helpers';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const colorClasses = {
  success: 'status-badge-success',
  warning: 'status-badge-warning',
  error: 'status-badge-error',
  info: 'status-badge-info',
  neutral: 'status-badge-neutral',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const color = getStatusColor(status);
  
  return (
    <span className={cn(
      'status-badge',
      colorClasses[color as keyof typeof colorClasses] || colorClasses.neutral,
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        color === 'success' && "bg-success",
        color === 'warning' && "bg-warning",
        color === 'error' && "bg-destructive",
        color === 'info' && "bg-info",
        color === 'neutral' && "bg-muted-foreground",
      )} />
      {capitalize(status)}
    </span>
  );
}
