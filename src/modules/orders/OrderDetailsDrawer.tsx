import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Order } from '@/types';
import { formatDateTime, formatCurrency } from '@/utils/helpers';
import { MapPin, User, Store, CreditCard, Truck } from 'lucide-react';

interface OrderDetailsDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const statusSteps = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'picked_up',
  'delivered',
];

export function OrderDetailsDrawer({ order, open, onClose }: OrderDetailsDrawerProps) {
  if (!order) return null;

  const currentStepIndex = statusSteps.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="text-left">
          <div className="flex items-center justify-between">
            <SheetTitle>Order {order.id}</SheetTitle>
            <StatusBadge status={order.status} />
          </div>
          <SheetDescription>{formatDateTime(order.createdAt)}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Order Status Stepper */}
          {!isCancelled && (
            <>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Order Progress</h4>
                <div className="flex items-center gap-2">
                  {statusSteps.map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index <= currentStepIndex
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`}
                      />
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`w-6 h-0.5 ${
                            index < currentStepIndex
                              ? 'bg-primary'
                              : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Customer & Partner Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Customer</span>
              </div>
              <p className="text-sm font-medium">{order.userName}</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Store className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Partner</span>
              </div>
              <p className="text-sm font-medium">{order.partnerName}</p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Delivery Address</p>
                <p className="text-sm">{order.deliveryAddress}</p>
              </div>
            </div>
            {order.deliveryPartnerName && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Delivery Partner</p>
                  <p className="text-sm">{order.deliveryPartnerName}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Order Items</h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                      {item.quantity}x
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <h4 className="text-sm font-medium text-muted-foreground">Payment Summary</h4>
              <StatusBadge status={order.paymentStatus} className="ml-auto" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>{formatCurrency(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            {!isCancelled && order.status !== 'delivered' && (
              <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                Update Status
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
