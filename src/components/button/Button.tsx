interface IProps {
  text: string;
  color?: string;
  isDisabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}

const Button: React.FC<IProps> = ({ text, onClick, color, isDisabled = false, style }) => {
  return (
    <button
      css={{
        width: '100%',
        padding: '10px',
        border: 'none',
        backgroundColor: color ?? 'red',
        borderRadius: '5px',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        cursor: 'pointer',

        ':enabled': {
          background: '#303030',
        },
        ':disabled': {
          background: 'grey',
        },
        ...style,
      }}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
