import React from 'react';
import { DashboardLayout } from '~/components/templates/layout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
