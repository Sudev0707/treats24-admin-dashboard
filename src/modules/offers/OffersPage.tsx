import { useState } from 'react';
import { Gift, Plus, MoreHorizontal, Edit, Trash2, Copy } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockCoupons } from '@/services/mockData';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { toast } from 'sonner';

export default function OffersPage() {
  const [coupons, setCoupons] = useState(mockCoupons);

  const handleToggleActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    toast.success('Coupon status updated');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  return (
    <>
      <PageHeader 
        title="Offers & Promotions" 
        description="Manage coupons and discounts"
      >
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Create Coupon
        </Button>
      </PageHeader>

      {/* Coupons Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead className="text-center">Active</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState
                    icon={<Gift className="w-8 h-8 text-muted-foreground" />}
                    title="No coupons created"
                    description="Create your first promotional coupon"
                    action={
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Coupon
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id} className="table-row-hover">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-mono font-medium">
                        {coupon.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopyCode(coupon.code)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm line-clamp-1">{coupon.description}</p>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {coupon.discountType === 'percentage'
                        ? `${coupon.discountValue}%`
                        : formatCurrency(coupon.discountValue)}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      Min. {formatCurrency(coupon.minOrderValue)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>{coupon.usedCount}</span>
                        <span className="text-muted-foreground">/ {coupon.usageLimit}</span>
                      </div>
                      <Progress 
                        value={(coupon.usedCount / coupon.usageLimit) * 100} 
                        className="h-1.5"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(coupon.validUntil)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={coupon.isActive}
                      onCheckedChange={() => handleToggleActive(coupon.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
