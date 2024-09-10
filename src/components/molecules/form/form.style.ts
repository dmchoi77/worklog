import { CSSProperties } from 'react';

import { SxProps } from '@mui/material';

export const paperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 8,
  backgroundColor: '#dbdbdb42',
  padding: 10,
  marginTop: 10,
  marginBottom: 20,
  width: '100%',
  height: '150px',
  borderRadius: 10,
};

export const buttonStyle: SxProps = {
  height: '30px',
  '.MuiButtonGroup-firstButton': {
    width: '60px',
    textAlign: 'left',
    justifyContent: 'flex-start',
    padding: 1,
  },
  '.MuiButtonGroup-lastButton': {
    width: '12px',
    minWidth: '12px',
  },
};

export const textAreaStyle: CSSProperties = {
  width: '100%',
  height: '120px',
  fontSize: '15px',
  resize: 'none',
  padding: 10,
  borderRadius: 8,
  border: '1px solid rgb(153 153 153 / 38%)',
};
