import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import type { Partner } from '@/types';

interface PartnerApprovalModalProps {
  partner: Partner | null;
  action: 'approve' | 'reject';
  open: boolean;
  onClose: () => void;
}

export function PartnerApprovalModal({ partner, action, open, onClose }: PartnerApprovalModalProps) {
  if (!partner) return null;

  const handleConfirm = () => {
    toast.success(
      action === 'approve'
        ? `${partner.businessName} has been approved`
        : `${partner.businessName} has been rejected`
    );
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === 'approve' ? 'Approve Partner' : 'Reject Partner'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {action === 'approve'
              ? `Are you sure you want to approve ${partner.businessName}? They will be able to receive orders after approval.`
              : `Are you sure you want to reject ${partner.businessName}? This action can be reversed later.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={
              action === 'approve'
                ? 'bg-success hover:bg-success/90'
                : 'bg-destructive hover:bg-destructive/90'
            }
          >
            {action === 'approve' ? 'Approve' : 'Reject'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
