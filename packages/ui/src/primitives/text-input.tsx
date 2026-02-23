import React, { useEffect, useState } from 'react';
import { Text, useInput } from 'ink';

interface TextInputProps {
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  suggestions?: string[];
}

interface InputKey {
  return?: boolean;
  backspace?: boolean;
  delete?: boolean;
  ctrl?: boolean;
  meta?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  defaultValue,
  onChange,
  onSubmit,
  placeholder,
  isDisabled
}) => {
  const [internalValue, setInternalValue] = useState<string>(value ?? defaultValue ?? '');
  const controlled = typeof value === 'string';
  const renderedValue = controlled ? value : internalValue;

  useEffect(() => {
    if (controlled) setInternalValue(value);
  }, [controlled, value]);

  useInput((input: string, key: InputKey) => {
    if (isDisabled) return;

    if (key.return) {
      onSubmit?.(renderedValue ?? '');
      return;
    }

    if (key.backspace || key.delete) {
      const next = (renderedValue ?? '').slice(0, -1);
      if (!controlled) setInternalValue(next);
      onChange(next);
      return;
    }

    if (input && !key.ctrl && !key.meta) {
      const next = `${renderedValue ?? ''}${input}`;
      if (!controlled) setInternalValue(next);
      onChange(next);
    }
  });

  const display = renderedValue && renderedValue.length > 0 ? renderedValue : (placeholder ?? '');
  const dimColor = !renderedValue || renderedValue.length === 0;

  return <Text dimColor={dimColor}>{display}</Text>;
};
