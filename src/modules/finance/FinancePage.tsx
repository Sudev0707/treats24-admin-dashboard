import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, Download } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { AreaChartComponent, DonutChartComponent, LineChartComponent } from '@/charts';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { mockRevenueChartData, mockRevenueSplitData, mockPartners } from '@/services/mockData';
import { formatCurrency, formatDate } from '@/utils/helpers';

export default function FinancePage() {
  // Mock payout data
  const mockPayouts = mockPartners
    .filter((p) => p.status === 'approved')
    .map((partner) => ({
      id: `payout-${partner.id}`,
      partnerName: partner.businessName,
      amount: partner.revenue * 0.85, // 85% to partner
      commission: partner.revenue * 0.15,
      status: Math.random() > 0.3 ? 'completed' : 'pending',
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

  return (
    <>
      <PageHeader 
        title="Finance" 
        description="Revenue, commissions, and payouts"
      >
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue"
          value={1245680}
          change={18.7}
          icon={DollarSign}
          format="currency"
          variant="primary"
        />
        <StatCard
          title="Total Commission"
          value={186852}
          change={15.2}
          icon={TrendingUp}
          format="currency"
          variant="success"
        />
        <StatCard
          title="Pending Payouts"
          value={45230}
          icon={CreditCard}
          format="currency"
          variant="warning"
        />
        <StatCard
          title="Partner Earnings"
          value={1058828}
          change={20.1}
          icon={ArrowUpRight}
          format="currency"
          variant="info"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <LineChartComponent
            data={mockRevenueChartData}
            lines={[
              { dataKey: 'revenue', color: 'hsl(var(--chart-1))', name: 'Revenue' },
              { dataKey: 'commission', color: 'hsl(var(--chart-2))', name: 'Commission' },
            ]}
            title="Revenue & Commission Trend"
          />
        </div>
        <DonutChartComponent
          data={mockRevenueSplitData}
          title="Revenue Distribution"
        />
      </div>

      {/* Recent Payouts */}
      <div className="bg-card rounded-xl border">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Recent Payouts</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Commission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayouts.map((payout) => (
              <TableRow key={payout.id} className="table-row-hover">
                <TableCell className="font-medium">{payout.partnerName}</TableCell>
                <TableCell className="text-right">{formatCurrency(payout.amount)}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(payout.commission)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={payout.status === 'completed' ? 'paid' : 'pending'} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(payout.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
