interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  isLoading?: boolean;
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
}

export const Button = ({
  label,
  onClick,
  disabled = false,
  fullWidth,
  isLoading,
  variant = 'filled',
  ...rest
}: ButtonProps) => (
  <button
    className={[
      fullWidth ? 'w-full' : 'w-auto',
      'h-[50px] px-4 y-2 py-2 rounded-[8px]',
      variant === 'filled' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border-[1px] border-gray-400',
      (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
    ].join(' ')}
    disabled={disabled || isLoading}
    onClick={onClick}
    {...rest}
  >
    {label}
  </button>
);
