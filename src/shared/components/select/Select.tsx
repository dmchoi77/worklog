import { forwardRef } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as RadixSelect from '@radix-ui/react-select';

interface SelectProps {
  options: {
    label: string;
    value: string;
  }[];
  selected: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}
export const Select = ({ placeholder, selected, onChange, options = [] }: SelectProps) => {
  const onValueChange = (newValue: string) => {
    const newOption = options.find(({ value }) => String(value) === newValue);
    newOption && onChange?.(newOption.value);
  };

  return (
    <RadixSelect.Root value={selected} onValueChange={onValueChange}>
      <RadixSelect.Trigger className='flex gap-x-[10px] border-[2px] rounded-[10px] bg-white border-gray-300 p-[10px] focus:outline-none'>
        <RadixSelect.Value placeholder={placeholder || 'Select an option'} />
        <ArrowDropDownIcon />
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content position='popper' sideOffset={5} className='w-[200px]'>
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport className='space-y-[8px] border-[2px] rounded-[10px] bg-white border-gray-300'>
            {options.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                content={item.label}
                className='focus:outline-none cursor-pointer hover:bg-slate-200 p-[10px]'
              >
                {item.label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

const SelectItem = forwardRef<HTMLDivElement, RadixSelect.SelectItemProps>(({ children, ...props }, ref) => (
  <RadixSelect.Item ref={ref} {...props}>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <RadixSelect.ItemIndicator />
  </RadixSelect.Item>
));

SelectItem.displayName = 'SelectItem';
