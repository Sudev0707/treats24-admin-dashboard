import { useState, useEffect } from 'react';
import { Users, Store, Package, DollarSign } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { StatCardSkeleton, ChartSkeleton } from '@/components/LoadingSkeleton';
import { 
  LineChartComponent, 
  AreaChartComponent, 
  PieChartComponent, 
  BarChartComponent 
} from '@/charts';
import {
  mockDashboardStats,
  mockOrdersChartData,
  mockRevenueChartData,
  mockOrderStatusData,
  mockTopPartnersData,
} from '@/services/mockData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <>
        <PageHeader 
          title="Dashboard" 
          description="Overview of your food delivery platform"
        />
        
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ChartSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your food delivery platform"
      >
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Users"
          value={mockDashboardStats.totalUsers}
          change={mockDashboardStats.userGrowth}
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="Total Partners"
          value={mockDashboardStats.totalPartners}
          change={mockDashboardStats.partnerGrowth}
          icon={Store}
          variant="success"
        />
        <StatCard
          title="Today's Orders"
          value={mockDashboardStats.todayOrders}
          change={mockDashboardStats.orderGrowth}
          icon={Package}
          variant="info"
        />
        <StatCard
          title="Total Revenue"
          value={mockDashboardStats.totalRevenue}
          change={mockDashboardStats.revenueGrowth}
          icon={DollarSign}
          format="currency"
          variant="warning"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <LineChartComponent
          data={mockOrdersChartData}
          lines={[
            { dataKey: 'orders', color: 'hsl(var(--chart-1))', name: 'Orders' },
          ]}
          title="Orders Trend"
        />
        <AreaChartComponent
          data={mockRevenueChartData}
          dataKey="revenue"
          title="Revenue Overview"
          color="hsl(var(--chart-2))"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PieChartComponent
          data={mockOrderStatusData}
          title="Order Status Distribution"
        />
        <BarChartComponent
          data={mockTopPartnersData}
          bars={[
            { dataKey: 'orders', color: 'hsl(var(--chart-1))', name: 'Orders' },
          ]}
          title="Top Partners by Orders"
          layout="vertical"
        />
      </div>
    </>
  );
}
