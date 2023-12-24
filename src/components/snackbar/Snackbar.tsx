import { Snackbar } from '@mui/material';

import { useSnackbarStore } from '~/stores/useSnackbarStore';

const CustomSnackbar = () => {
  const { horizontal, message, open, vertical, reset } = useSnackbarStore();

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => reset()}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={2000}
        transitionDuration={1000}
      />
    </div>
  );
};

export default CustomSnackbar;
