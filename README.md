# Treats24 Admin Dashboard

A comprehensive admin dashboard for the Treats 24 food delivery platform. Manage customers, restaurant partners, orders, menus, promotions, deliveries, and analytics from a single unified interface.

## Features

- **Authentication & Authorization** - Role-based access control with three roles: ADMIN, SUPPORT, and FINANCE
- **Dashboard** - Real-time statistics, growth metrics, and revenue overview
- **User Management** - Manage platform users with search, filtering, and status control
- **Partner Management** - Restaurant partner approval workflow, document verification, and performance tracking
- **Order Management** - Complete order lifecycle management with status tracking
- **Menu Management** - Menu items and categories management
- **Delivery Management** - Delivery partner tracking and performance metrics
- **Finance** - Revenue analytics and financial reports
- **Offers & Promotions** - Coupon and campaign management
- **Notifications** - Push, SMS, and email campaign management
- **CMS** - Banner and content management
- **Analytics** - Interactive charts and data visualization

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Routing:** React Router DOM v6
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Testing:** Vitest


## Project Structure

```
src/
├── auth/           # Authentication
├── charts/         # Chart components
├── components/     # UI components
├── layouts/        # Page layouts
├── modules/        # Feature modules
├── services/       # API services
├── store/          # State management
├── types/          # TypeScript types
└── utils/          # Utilities
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@treats24.com | admin123 |
| SUPPORT | support@treats24.com | support123 |
| FINANCE | finance@treats24.com | finance123 |

