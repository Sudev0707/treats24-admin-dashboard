import { Truck, Star, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockDeliveryPartners } from '@/services/mockData';
import { getInitials, formatCurrency } from '@/utils/helpers';

export default function DeliveryPage() {
  return (
    <>
      <PageHeader 
        title="Delivery Partners" 
        description="Manage delivery personnel"
      >
        <Button className="bg-gradient-primary hover:opacity-90">
          <Truck className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="stat-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mockDeliveryPartners.filter((p) => p.status === 'available').length}
              </p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mockDeliveryPartners.filter((p) => p.status === 'busy').length}
              </p>
              <p className="text-sm text-muted-foreground">On Delivery</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {mockDeliveryPartners.filter((p) => p.status === 'offline').length}
              </p>
              <p className="text-sm text-muted-foreground">Offline</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Partners Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-right">Deliveries</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDeliveryPartners.map((partner) => (
              <TableRow key={partner.id} className="table-row-hover">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={partner.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {getInitials(partner.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{partner.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={partner.status} />
                </TableCell>
                <TableCell className="capitalize">{partner.vehicleType}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-medium">{partner.rating}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{partner.totalDeliveries}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(partner.earnings)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
