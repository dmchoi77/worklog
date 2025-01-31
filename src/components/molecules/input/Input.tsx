import { ReactNode, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ name, LeftIcon, RightIcon, ...props }, ref) => (
  <div className={['flex w-full h-[50px] align-middle items-center', props.disabled && 'bg-gray-200'].join(' ')}>
    {LeftIcon && LeftIcon}
    <input
      name={name}
      ref={ref}
      className={[
        'w-full h-full px-[12px] rounded-[10px] border border-gray-300',
        props.disabled && 'bg-gray-200',
      ].join(' ')}
      {...props}
    />
    {RightIcon && RightIcon}
  </div>
));

Input.displayName = 'Input';
