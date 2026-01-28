import type {
  User,
  Partner,
  Order,
  MenuItem,
  DeliveryPartner,
  Coupon,
  Banner,
  DashboardStats,
  ChartData,
  AdminUser,
} from '@/types';

// Generate random dates
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Mock Users
export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  email: `user${i + 1}@example.com`,
  name: `User ${i + 1}`,
  phone: `+1 555-${String(1000 + i).padStart(4, '0')}`,
  status: ['active', 'active', 'active', 'blocked', 'pending'][Math.floor(Math.random() * 5)] as User['status'],
  walletBalance: Math.floor(Math.random() * 500),
  totalOrders: Math.floor(Math.random() * 100),
  createdAt: randomDate(new Date(2023, 0, 1), new Date()),
  lastActive: randomDate(new Date(2024, 0, 1), new Date()),
}));

// Mock Partners
export const mockPartners: Partner[] = [
  {
    id: 'partner-1',
    businessName: 'Burger Palace',
    ownerName: 'Mike Johnson',
    email: 'mike@burgerpalace.com',
    phone: '+1 555-0101',
    address: '123 Food Street, City',
    status: 'approved',
    rating: 4.7,
    totalOrders: 1250,
    revenue: 45000,
    commissionRate: 15,
    documents: [
      { id: 'd1', type: 'license', name: 'Business License', url: '#', verified: true, uploadedAt: '2024-01-15' },
      { id: 'd2', type: 'identity', name: 'Owner ID', url: '#', verified: true, uploadedAt: '2024-01-15' },
    ],
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'partner-2',
    businessName: 'Pizza Express',
    ownerName: 'Sarah Williams',
    email: 'sarah@pizzaexpress.com',
    phone: '+1 555-0102',
    address: '456 Main Ave, City',
    status: 'approved',
    rating: 4.5,
    totalOrders: 980,
    revenue: 38000,
    commissionRate: 15,
    documents: [
      { id: 'd3', type: 'license', name: 'Business License', url: '#', verified: true, uploadedAt: '2024-02-01' },
    ],
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'partner-3',
    businessName: 'Sushi Master',
    ownerName: 'Ken Tanaka',
    email: 'ken@sushimaster.com',
    phone: '+1 555-0103',
    address: '789 Ocean Blvd, City',
    status: 'pending',
    rating: 0,
    totalOrders: 0,
    revenue: 0,
    commissionRate: 15,
    documents: [
      { id: 'd4', type: 'license', name: 'Business License', url: '#', verified: false, uploadedAt: '2024-03-10' },
    ],
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'partner-4',
    businessName: 'Taco Fiesta',
    ownerName: 'Carlos Rodriguez',
    email: 'carlos@tacofiesta.com',
    phone: '+1 555-0104',
    address: '321 Spice Lane, City',
    status: 'approved',
    rating: 4.8,
    totalOrders: 750,
    revenue: 28000,
    commissionRate: 12,
    documents: [],
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'partner-5',
    businessName: 'Green Bowl',
    ownerName: 'Emma Green',
    email: 'emma@greenbowl.com',
    phone: '+1 555-0105',
    address: '555 Health Street, City',
    status: 'disabled',
    rating: 4.2,
    totalOrders: 320,
    revenue: 12000,
    commissionRate: 15,
    documents: [],
    createdAt: '2024-01-05T00:00:00Z',
  },
];

// Mock Orders
const orderStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivered', 'cancelled'] as const;
export const mockOrders: Order[] = Array.from({ length: 100 }, (_, i) => {
  const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
  const subtotal = Math.floor(Math.random() * 100) + 20;
  const deliveryFee = 5;
  const tax = subtotal * 0.08;
  const discount = Math.random() > 0.7 ? Math.floor(subtotal * 0.1) : 0;
  
  return {
    id: `ORD-${String(1000 + i).padStart(5, '0')}`,
    userId: mockUsers[Math.floor(Math.random() * mockUsers.length)].id,
    userName: mockUsers[Math.floor(Math.random() * mockUsers.length)].name,
    partnerId: mockPartners[Math.floor(Math.random() * mockPartners.length)].id,
    partnerName: mockPartners[Math.floor(Math.random() * mockPartners.length)].businessName,
    deliveryPartnerId: Math.random() > 0.3 ? `dp-${Math.floor(Math.random() * 10) + 1}` : undefined,
    deliveryPartnerName: Math.random() > 0.3 ? `Driver ${Math.floor(Math.random() * 10) + 1}` : undefined,
    items: [
      {
        id: `item-${i}-1`,
        menuItemId: `menu-${Math.floor(Math.random() * 20) + 1}`,
        name: ['Burger', 'Pizza', 'Sushi Roll', 'Taco', 'Salad'][Math.floor(Math.random() * 5)],
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.floor(Math.random() * 20) + 10,
        total: 0,
      },
    ],
    subtotal,
    deliveryFee,
    tax,
    discount,
    total: subtotal + deliveryFee + tax - discount,
    status,
    paymentMethod: ['card', 'wallet', 'cash'][Math.floor(Math.random() * 3)] as Order['paymentMethod'],
    paymentStatus: status === 'cancelled' ? 'refunded' : 'paid',
    deliveryAddress: `${Math.floor(Math.random() * 999) + 1} Random Street, City, State ${Math.floor(Math.random() * 90000) + 10000}`,
    notes: Math.random() > 0.7 ? 'Extra napkins please' : undefined,
    timeline: [
      { status: 'pending', timestamp: randomDate(new Date(2024, 0, 1), new Date()) },
    ],
    createdAt: randomDate(new Date(2024, 0, 1), new Date()),
    updatedAt: randomDate(new Date(2024, 0, 1), new Date()),
  };
});

// Mock Menu Items
export const mockMenuItems: MenuItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: `menu-${i + 1}`,
  partnerId: mockPartners[Math.floor(Math.random() * mockPartners.length)].id,
  name: [
    'Classic Burger', 'Cheese Pizza', 'California Roll', 'Chicken Taco', 'Caesar Salad',
    'French Fries', 'Onion Rings', 'Miso Soup', 'Guacamole', 'Greek Salad',
  ][i % 10],
  description: 'Delicious food item with fresh ingredients',
  price: Math.floor(Math.random() * 20) + 8,
  category: ['Main', 'Sides', 'Drinks', 'Desserts'][Math.floor(Math.random() * 4)],
  isAvailable: Math.random() > 0.1,
  isOutOfStock: Math.random() > 0.8,
  createdAt: randomDate(new Date(2023, 0, 1), new Date()),
}));

// Mock Delivery Partners
export const mockDeliveryPartners: DeliveryPartner[] = Array.from({ length: 20 }, (_, i) => ({
  id: `dp-${i + 1}`,
  name: `Driver ${i + 1}`,
  phone: `+1 555-${String(2000 + i).padStart(4, '0')}`,
  status: ['available', 'busy', 'offline'][Math.floor(Math.random() * 3)] as DeliveryPartner['status'],
  rating: Number((4 + Math.random()).toFixed(1)),
  totalDeliveries: Math.floor(Math.random() * 500),
  earnings: Math.floor(Math.random() * 5000),
  vehicleType: ['bike', 'scooter', 'car'][Math.floor(Math.random() * 3)] as DeliveryPartner['vehicleType'],
}));

// Mock Coupons
export const mockCoupons: Coupon[] = [
  {
    id: 'coupon-1',
    code: 'WELCOME20',
    description: '20% off for new users',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 30,
    maxDiscount: 15,
    usageLimit: 1000,
    usedCount: 456,
    targetType: 'all',
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    isActive: true,
  },
  {
    id: 'coupon-2',
    code: 'FLAT10',
    description: '$10 off on orders above $50',
    discountType: 'fixed',
    discountValue: 10,
    minOrderValue: 50,
    usageLimit: 500,
    usedCount: 234,
    targetType: 'all',
    validFrom: '2024-03-01T00:00:00Z',
    validUntil: '2024-06-30T23:59:59Z',
    isActive: true,
  },
];

// Mock Banners
export const mockBanners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Summer Sale',
    image: '/placeholder.svg',
    link: '/offers',
    placement: 'home',
    isActive: true,
    order: 1,
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'banner-2',
    title: 'New Partners',
    image: '/placeholder.svg',
    link: '/partners',
    placement: 'home',
    isActive: true,
    order: 2,
    createdAt: '2024-03-05T00:00:00Z',
  },
];

// Mock Admin Users
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'sudev@treats24.com',
    name: 'Sudev',
    role: 'ADMIN',
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'support@treats24.com',
    name: 'Treat Support',
    role: 'SUPPORT',
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    email: 'finance@treats24.com',
    name: 'Treat Finance',
    role: 'FINANCE',
    lastLogin: new Date(Date.now() - 172800000).toISOString(),
    createdAt: '2024-03-01T00:00:00Z',
  },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 12458,
  totalPartners: 234,
  todayOrders: 1847,
  totalRevenue: 1245680,
  userGrowth: 12.5,
  partnerGrowth: 8.3,
  orderGrowth: 15.2,
  revenueGrowth: 18.7,
};

// Chart Data
export const mockOrdersChartData: ChartData[] = [
  { name: 'Mon', orders: 320, revenue: 12400 },
  { name: 'Tue', orders: 280, revenue: 10800 },
  { name: 'Wed', orders: 340, revenue: 13200 },
  { name: 'Thu', orders: 390, revenue: 15100 },
  { name: 'Fri', orders: 480, revenue: 18600 },
  { name: 'Sat', orders: 520, revenue: 20100 },
  { name: 'Sun', orders: 450, revenue: 17400 },
];

export const mockRevenueChartData: ChartData[] = [
  { name: 'Jan', revenue: 85000, commission: 12750 },
  { name: 'Feb', revenue: 92000, commission: 13800 },
  { name: 'Mar', revenue: 108000, commission: 16200 },
  { name: 'Apr', revenue: 115000, commission: 17250 },
  { name: 'May', revenue: 128000, commission: 19200 },
  { name: 'Jun', revenue: 142000, commission: 21300 },
];

export const mockOrderStatusData: ChartData[] = [
  { name: 'Delivered', value: 65 },
  { name: 'Preparing', value: 15 },
  { name: 'In Transit', value: 12 },
  { name: 'Cancelled', value: 8 },
];

export const mockTopPartnersData: ChartData[] = [
  { name: 'Burger Palace', orders: 1250, revenue: 45000 },
  { name: 'Pizza Express', orders: 980, revenue: 38000 },
  { name: 'Taco Fiesta', orders: 750, revenue: 28000 },
  { name: 'Green Bowl', orders: 320, revenue: 12000 },
  { name: 'Sushi Master', orders: 280, revenue: 10500 },
];

export const mockUserGrowthData: ChartData[] = [
  { name: 'Jan', users: 8500 },
  { name: 'Feb', users: 9200 },
  { name: 'Mar', users: 9800 },
  { name: 'Apr', users: 10500 },
  { name: 'May', users: 11200 },
  { name: 'Jun', users: 12458 },
];

export const mockPartnerGrowthData: ChartData[] = [
  { name: 'Jan', partners: 180 },
  { name: 'Feb', partners: 195 },
  { name: 'Mar', partners: 210 },
  { name: 'Apr', partners: 218 },
  { name: 'May', partners: 226 },
  { name: 'Jun', partners: 234 },
];

export const mockRevenueSplitData: ChartData[] = [
  { name: 'Order Revenue', value: 85 },
  { name: 'Commission', value: 10 },
  { name: 'Delivery Fees', value: 5 },
];
