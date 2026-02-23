import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

interface SpinnerProps {
  type?: 'dots';
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ type = 'dots', label = 'Loading...' }) => {
  const frames = type === 'dots' ? ['.', '..', '...'] : ['.', '..', '...'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((n) => (n + 1) % frames.length), 200);
    return () => clearInterval(id);
  }, [frames.length]);

  return <Text>{`${label} ${frames[index]}`}</Text>;
};
