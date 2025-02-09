import React from 'react';
import { AppLayout } from '~/shared/components/layout/AppLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
