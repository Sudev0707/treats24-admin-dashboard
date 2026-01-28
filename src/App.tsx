import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import LoginPage from "@/auth/LoginPage";
import UnauthorizedPage from "@/auth/UnauthorizedPage";
import { DashboardPage } from "@/modules/dashboard";
import { UsersPage } from "@/modules/users";
import { PartnersPage } from "@/modules/partners";
import { OrdersPage } from "@/modules/orders";
import { MenuPage } from "@/modules/menu";
import { DeliveryPage } from "@/modules/delivery";
import { FinancePage } from "@/modules/finance";
import { OffersPage } from "@/modules/offers";
import { NotificationsPage } from "@/modules/notifications";
import { CMSPage } from "@/modules/cms";
import { AnalyticsPage } from "@/modules/analytics";
import { SettingsPage } from "@/modules/settings";
import { AdminUsersPage } from "@/modules/admin-users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><DashboardLayout><DashboardPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><DashboardLayout><UsersPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/partners" element={<ProtectedRoute><DashboardLayout><PartnersPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><DashboardLayout><OrdersPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/menu" element={<ProtectedRoute><DashboardLayout><MenuPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/delivery" element={<ProtectedRoute><DashboardLayout><DeliveryPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/finance" element={<ProtectedRoute><DashboardLayout><FinancePage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/offers" element={<ProtectedRoute><DashboardLayout><OffersPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><DashboardLayout><NotificationsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/cms" element={<ProtectedRoute><DashboardLayout><CMSPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><AnalyticsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin-users" element={<ProtectedRoute><DashboardLayout><AdminUsersPage /></DashboardLayout></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
