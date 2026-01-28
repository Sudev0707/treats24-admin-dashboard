// Core Types for Treats 24 Admin Dashboard

export type UserRole = 'ADMIN' | 'SUPPORT' | 'FINANCE';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'blocked' | 'pending';
  walletBalance: number;
  totalOrders: number;
  createdAt: string;
  lastActive: string;
}

export interface Partner {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  logo?: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected' | 'disabled';
  rating: number;
  totalOrders: number;
  revenue: number;
  commissionRate: number;
  documents: PartnerDocument[];
  createdAt: string;
}

export interface PartnerDocument {
  id: string;
  type: 'license' | 'identity' | 'tax' | 'other';
  name: string;
  url: string;
  verified: boolean;
  uploadedAt: string;
}

export interface MenuItem {
  id: string;
  partnerId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  isOutOfStock: boolean;
  createdAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  partnerId: string;
  itemCount: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'picked_up' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  partnerId: string;
  partnerName: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'card' | 'wallet' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  deliveryAddress: string;
  notes?: string;
  timeline: OrderTimeline[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderTimeline {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  totalDeliveries: number;
  earnings: number;
  vehicleType: 'bike' | 'scooter' | 'car';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  lastLogin: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  targetType: 'all' | 'user' | 'partner';
  targetIds?: string[];
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'push' | 'sms' | 'email';
  targetAudience: 'all_users' | 'all_partners' | 'specific';
  targetIds?: string[];
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sent';
  scheduledFor?: string;
}

export interface Banner {
  id: string;
  title: string;
  image: string;
  link?: string;
  placement: 'home' | 'category' | 'partner';
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface AppConfig {
  deliveryFee: number;
  taxRate: number;
  defaultCommissionRate: number;
  minimumOrderValue: number;
  maintenanceMode: boolean;
  currentVersion: string;
  forceUpdate: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  totalPartners: number;
  todayOrders: number;
  totalRevenue: number;
  userGrowth: number;
  partnerGrowth: number;
  orderGrowth: number;
  revenueGrowth: number;
}

export interface ChartData {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
