import React from 'react';
import { DashboardLayout } from '~/shared/components/layout/AppLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
