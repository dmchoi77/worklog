import { useCallback, useEffect, useRef } from 'react';

import { useRecoilState } from 'recoil';

import { dialogDefaultState, dialogState } from '~/stores/dialog/dialog';

const useDialog = () => {
  const [{ open }, setDialog] = useRecoilState(dialogState);

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleCloseDialog = useCallback(
    (event: MouseEvent) => {
      if (open && dialogRef.current === event.target) {
        setDialog(dialogDefaultState);
      }
    },
    [open],
  );

  const onClose = () => setDialog(dialogDefaultState);

  useEffect(() => {
    window.addEventListener('click', handleCloseDialog);

    return () => {
      window.removeEventListener('click', handleCloseDialog);
    };
  }, [open, handleCloseDialog]);

  useEffect(() => {
    return () => {
      setDialog(dialogDefaultState);
    };
  }, []);

  return {
    open,
    dialogRef,
    onClose,
    setDialog,
  };
};

export default useDialog;
