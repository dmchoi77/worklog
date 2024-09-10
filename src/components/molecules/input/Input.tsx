import { ReactNode, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ leftIcon, rightIcon, ...props }, ref) => {
  return (
    <div className='flex w-full h-[50px] rounded-[10px] p-[8px] border border-gray-300 align-middle items-center'>
      {leftIcon && leftIcon}
      <input ref={ref} className='w-full p-[4px]' {...props} />
      {rightIcon && rightIcon}
    </div>
  );
});

Input.displayName = 'Input';
