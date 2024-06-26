import { ChangeEventHandler } from 'react';

import { Interpolation, Theme } from '@emotion/react';

interface SelecBoxProps {
  options: {
    label: string;
    code: string;
  }[];
  style?: Interpolation<Theme>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
}
const SelectBox = ({ options, style, onChange, placeholder }: SelecBoxProps) => {
  return (
    <select
      onChange={onChange}
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
    >
      <option hidden>{placeholder}</option>
      {options?.map((option) => <option key={option.code}>{option.label}</option>)}
    </select>
  );
};
export default SelectBox;
