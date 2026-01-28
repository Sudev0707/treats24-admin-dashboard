import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, Ban, Store } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockPartners } from '@/services/mockData';
import { formatCurrency, formatDate, getInitials } from '@/utils/helpers';
import { toast } from 'sonner';
import { PartnerApprovalModal } from './PartnerApprovalModal';
import type { Partner } from '@/types';
import { Star } from 'lucide-react';

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [approvalPartner, setApprovalPartner] = useState<Partner | null>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');

  const filteredPartners = mockPartners.filter((partner) => {
    const matchesSearch =
      partner.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = (partner: Partner) => {
    setApprovalPartner(partner);
    setApprovalAction('approve');
  };

  const handleReject = (partner: Partner) => {
    setApprovalPartner(partner);
    setApprovalAction('reject');
  };

  const handleToggleStatus = (partner: Partner) => {
    const action = partner.status === 'disabled' ? 'enabled' : 'disabled';
    toast.success(`${partner.businessName} has been ${action}`);
  };

  return (
    <>
      <PageHeader 
        title="Partners" 
        description="Manage restaurant and store partners"
      >
        <Button className="bg-gradient-primary hover:opacity-90">
          <Store className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search partners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Partners Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Rating</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <EmptyState
                    icon={<Store className="w-8 h-8 text-muted-foreground" />}
                    title="No partners found"
                    description="Try adjusting your search or filter"
                  />
                </TableCell>
              </TableRow>
            ) : (
              filteredPartners.map((partner) => (
                <TableRow key={partner.id} className="table-row-hover">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 rounded-lg">
                        <AvatarImage src={partner.logo} />
                        <AvatarFallback className="bg-primary/10 text-primary rounded-lg">
                          {getInitials(partner.businessName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{partner.businessName}</p>
                        <p className="text-sm text-muted-foreground">{partner.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{partner.ownerName}</TableCell>
                  <TableCell>
                    <StatusBadge status={partner.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    {partner.rating > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="font-medium">{partner.rating}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{partner.totalOrders}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(partner.revenue)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(partner.createdAt)}
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
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {partner.status === 'pending' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleApprove(partner)}>
                              <CheckCircle className="w-4 h-4 mr-2 text-success" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(partner)}>
                              <XCircle className="w-4 h-4 mr-2 text-destructive" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {partner.status === 'approved' && (
                          <DropdownMenuItem onClick={() => handleToggleStatus(partner)}>
                            <Ban className="w-4 h-4 mr-2" />
                            Disable Partner
                          </DropdownMenuItem>
                        )}
                        {partner.status === 'disabled' && (
                          <DropdownMenuItem onClick={() => handleToggleStatus(partner)}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Enable Partner
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Approval Modal */}
      <PartnerApprovalModal
        partner={approvalPartner}
        action={approvalAction}
        open={!!approvalPartner}
        onClose={() => setApprovalPartner(null)}
      />
    </>
  );
}
