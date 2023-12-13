import { useState } from 'react';

const useInput = () => {
  const [input, setInput] = useState<string>('');

  const handleInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInput(value);

  const reset = () => setInput('');

  return { input, handleInput, reset };
};

export default useInput;
