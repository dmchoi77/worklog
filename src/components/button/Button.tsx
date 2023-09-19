interface IProps {
  text: string;
  color?: string;
  isDisabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
//
const Button: React.FC<IProps> = ({ text, onClick, color, isDisabled = false }) => {
  return (
    <button
      css={{
        width: '100%',
        padding: '10px',
        border: 'none',
        backgroundColor: color ?? 'red',
        borderRadius: '10px',
        color: '#ffffff',
        fontWeight: '600',
        cursor: 'pointer',

        ':enabled': {
          background: 'orange',
        },
        ':disabled': {
          background: 'grey',
        },
      }}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
