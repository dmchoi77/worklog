import { Interpolation, Theme } from '@emotion/react';
import { ChangeEventHandler } from 'react';

interface BaseInputProps {
  name?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string | undefined;
  style?: Interpolation<Theme>;
  autoFocus?: boolean;
}

const BaseInput: React.FC<BaseInputProps> = ({
  onChange,
  value,
  name = '',
  placeholder,
  style,
  autoFocus = false,
}) => {
  return (
    <input
      autoFocus={autoFocus}
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      css={[
        {
          height: '50px',
          borderRadius: '10px',
          border: '1px solid #cfcfcf',
          fontSize: '14px',
          padding: '5px',
          ':focus': {
            outline: 'none !important',
            borderColor: 'red',
          },
        },
        style,
      ]}
    />
  );
};

export default BaseInput;
