import { ReactNode, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ name, LeftIcon, RightIcon, ...props }, ref) => (
  <div
    className={[
      'flex w-full h-[50px] bg-white rounded-[8px] border border-gray-300 align-middle items-center',
      props.disabled && 'bg-gray-200',
    ].join(' ')}
  >
    {LeftIcon && LeftIcon}
    <input
      name={name}
      ref={ref}
      className={['w-full px-[12px] focus:outline-none', props.disabled && 'bg-gray-200'].join(' ')}
      {...props}
    />
    {RightIcon && RightIcon}
  </div>
));

Input.displayName = 'Input';
