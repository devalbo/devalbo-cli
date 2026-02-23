import React from 'react';
import { Box, Text, useInput } from 'ink';

export interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps {
  items: SelectItem[];
  onSelect: (item: SelectItem) => void;
}

interface InputKey {
  upArrow?: boolean;
  downArrow?: boolean;
  return?: boolean;
}

export const Select: React.FC<SelectProps> = ({ items, onSelect }) => {
  const [index, setIndex] = React.useState(0);

  useInput((_input: string, key: InputKey) => {
    if (items.length === 0) return;
    if (key.upArrow) {
      setIndex((n) => (n - 1 + items.length) % items.length);
      return;
    }
    if (key.downArrow) {
      setIndex((n) => (n + 1) % items.length);
      return;
    }
    if (key.return) {
      const selected = items[index];
      if (selected) onSelect(selected);
    }
  });

  return (
    <Box flexDirection="column">
      {items.map((item, idx) => (
        idx === index ? (
          <Text key={item.value} color="cyan">
            {'› '}
            {item.label}
          </Text>
        ) : (
          <Text key={item.value}>
            {'  '}
            {item.label}
          </Text>
        )
      ))}
    </Box>
  );
};
