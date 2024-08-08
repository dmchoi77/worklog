interface ButtonProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({ children, onClick, isDisabled = false, fullWidth, isLoading }: ButtonProps) => {
  return (
    <button
      css={{
        width: fullWidth ? '100%' : 'auto',
        padding: '6px 16px',
        border: 'none',
        borderRadius: '5px',
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        cursor: 'pointer',

        ':enabled': {
          background: '#303030',
        },
        ':disabled': {
          background: 'grey',
        },
      }}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
