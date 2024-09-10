interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = ({ children, onClick, isDisabled = false, fullWidth, isLoading, ...rest }: ButtonProps) => (
  <button
    className={`${fullWidth ? 'w-full' : 'auto'} h-[50px] px-4 y-2 py-2 rounded-md text-white font-semibold cursor-pointer enabled:bg-gray-800 disabled:bg-gray-400`}
    disabled={isDisabled || isLoading}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);
