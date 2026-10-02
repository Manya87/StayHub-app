import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from './routeConfig';

// Page components
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { PropertiesPage } from '@/pages/PropertiesPage';
import { PropertyDetailsPage } from '@/pages/PropertyDetailsPage';
import { RoomsPage } from '@/pages/RoomsPage';
import { TenantsPage } from '@/pages/TenantsPage';
import { TenantDetailsPage } from '@/pages/TenantDetailsPage';
import { PaymentsPage } from '@/pages/PaymentsPage';
import { ExpensesPage } from '@/pages/ExpensesPage';
import { ComplaintsPage } from '@/pages/ComplaintsPage';
import { MaintenancePage } from '@/pages/MaintenancePage';
import { MessPage } from '@/pages/MessPage';
import { VisitorsPage } from '@/pages/VisitorsPage';
import { StaffPage } from '@/pages/StaffPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { UnauthorizedPage } from '@/pages/UnauthorizedPage';
import { GoogleCallbackPage } from '@/pages/GoogleCallbackPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<LoginPage />} />
      <Route path={ROUTES.GOOGLE_CALLBACK} element={<GoogleCallbackPage />} />
      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

      {/* Authenticated Layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROPERTIES} element={<PropertiesPage />} />
          <Route path={ROUTES.PROPERTY_DETAILS} element={<PropertyDetailsPage />} />
          <Route path={ROUTES.ROOMS} element={<RoomsPage />} />
          <Route path={ROUTES.TENANTS} element={<TenantsPage />} />
          <Route path={ROUTES.TENANT_DETAILS} element={<TenantDetailsPage />} />
          <Route path={ROUTES.PAYMENTS} element={<PaymentsPage />} />
          <Route path={ROUTES.EXPENSES} element={<ExpensesPage />} />
          <Route path={ROUTES.COMPLAINTS} element={<ComplaintsPage />} />
          <Route path={ROUTES.MAINTENANCE} element={<MaintenancePage />} />
          <Route path={ROUTES.MESS} element={<MessPage />} />
          <Route path={ROUTES.VISITORS} element={<VisitorsPage />} />
          <Route path={ROUTES.STAFF} element={<StaffPage />} />
          <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
