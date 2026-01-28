import { LineChartComponent, AreaChartComponent, BarChartComponent, PieChartComponent } from '@/charts';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Calendar, Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  mockOrdersChartData,
  mockRevenueChartData,
  mockOrderStatusData,
  mockTopPartnersData,
  mockUserGrowthData,
  mockPartnerGrowthData,
} from '@/services/mockData';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <>
      <PageHeader 
        title="Analytics" 
        description="Detailed platform analytics and insights"
      >
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Orders & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <LineChartComponent
          data={mockOrdersChartData}
          lines={[
            { dataKey: 'orders', color: 'hsl(var(--chart-1))', name: 'Orders' },
          ]}
          title="Daily Orders"
        />
        <AreaChartComponent
          data={mockRevenueChartData}
          dataKey="revenue"
          title="Revenue Trend"
          color="hsl(var(--chart-2))"
        />
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <LineChartComponent
          data={mockUserGrowthData}
          lines={[
            { dataKey: 'users', color: 'hsl(var(--chart-3))', name: 'Users' },
          ]}
          title="User Growth"
        />
        <LineChartComponent
          data={mockPartnerGrowthData}
          lines={[
            { dataKey: 'partners', color: 'hsl(var(--chart-4))', name: 'Partners' },
          ]}
          title="Partner Growth"
        />
      </div>

      {/* Status & Top Partners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PieChartComponent
          data={mockOrderStatusData}
          title="Order Status Distribution"
        />
        <BarChartComponent
          data={mockTopPartnersData}
          bars={[
            { dataKey: 'revenue', color: 'hsl(var(--chart-1))', name: 'Revenue' },
          ]}
          title="Top Partners by Revenue"
          layout="vertical"
        />
      </div>
    </>
  );
}
