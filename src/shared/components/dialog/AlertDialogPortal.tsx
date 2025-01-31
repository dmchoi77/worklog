import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAlertDialogStore } from '~/stores/useAlertDialogStore';

export const AlertDialogPortal = () => {
  const { dialogStack, resetDialog } = useAlertDialogStore();
  const pathname = usePathname();

  useEffect(() => {
    resetDialog();
  }, [pathname]);

  return (
    <>
      {dialogStack.map((dialog, index) => (
        <div key={index}>{dialog}</div>
      ))}
    </>
  );
};
