import { cn, formatNumber, formatCurrency } from '@/utils/helpers';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  format?: 'number' | 'currency';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'bg-gradient-primary text-primary-foreground',
  success: 'bg-gradient-success text-success-foreground',
  warning: 'bg-gradient-warning text-warning-foreground',
  info: 'bg-gradient-info text-info-foreground',
};

const iconStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-white/20 text-white',
  success: 'bg-white/20 text-white',
  warning: 'bg-white/20 text-white',
  info: 'bg-white/20 text-white',
};

export function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon: Icon,
  format = 'number',
  variant = 'default',
}: StatCardProps) {
  const formattedValue = format === 'currency' 
    ? formatCurrency(value) 
    : formatNumber(value);
  
  const isPositive = change && change > 0;
  const isDefault = variant === 'default';

  return (
    <div className={cn(
      "stat-card rounded-xl p-6",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            isDefault ? "text-muted-foreground" : "text-white/80"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-2xl lg:text-3xl font-bold",
            !isDefault && "text-white"
          )}>
            {formattedValue}
          </p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-sm",
              isDefault 
                ? isPositive ? "text-success" : "text-destructive"
                : "text-white/80"
            )}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className={cn(
                isDefault ? "text-muted-foreground" : "text-white/60"
              )}>
                {changeLabel}
              </span>
            </div>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          iconStyles[variant]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
