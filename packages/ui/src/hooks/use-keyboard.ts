import { useInput } from 'ink';

export const useKeyboard = (handler: (input: string, key: { upArrow: boolean; downArrow: boolean; return: boolean }) => void) => {
  useInput((input: string, key: { upArrow?: boolean; downArrow?: boolean; return?: boolean }) => {
    handler(input, {
      upArrow: Boolean(key.upArrow),
      downArrow: Boolean(key.downArrow),
      return: Boolean(key.return)
    });
  });
};
