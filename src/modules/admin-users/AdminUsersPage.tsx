import { useState } from 'react';
import { Shield, Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockAdminUsers } from '@/services/mockData';
import { formatDateTime, getInitials } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';

export default function AdminUsersPage() {
  const roleColors: Record<string, string> = {
    ADMIN: 'bg-primary text-primary-foreground',
    SUPPORT: 'bg-info text-info-foreground',
    FINANCE: 'bg-warning text-warning-foreground',
  };

  return (
    <>
      <PageHeader 
        title="Admin Users" 
        description="Manage admin accounts and roles"
      >
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Admin
        </Button>
      </PageHeader>

      {/* Role Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {['ADMIN', 'SUPPORT', 'FINANCE'].map((role) => (
          <div key={role} className="stat-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${roleColors[role]} flex items-center justify-center`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium capitalize">{role.toLowerCase()}</p>
                  <p className="text-sm text-muted-foreground">
                    {mockAdminUsers.filter((u) => u.role === role).length} users
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Users Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAdminUsers.map((admin) => (
              <TableRow key={admin.id} className="table-row-hover">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={admin.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {getInitials(admin.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={roleColors[admin.role]}>
                    {admin.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(admin.lastLogin)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateTime(admin.createdAt)}
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
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
