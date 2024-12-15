import { useAlertDialogStore } from '~/stores/useAlertDialogStore';

export const AlertDialogPortal = () => {
  const { dialogStack } = useAlertDialogStore();

  return (
    <>
      {dialogStack.map((dialog, index) => (
        <div key={index}>{dialog}</div>
      ))}
    </>
  );
};
