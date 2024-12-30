import React from 'react';

export type CopyState = 'idle' | 'copying' | 'success' | 'error';

export interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text: string;
  children?: React.ReactNode | ((state: CopyState) => React.ReactNode);
  timeout?: number;
  onCopy?: (success: boolean, error?: Error) => void;
  successMessage?: string;
  errorMessage?: string;
  ariaLabel?: string;
}

export const HandyCopyClipboard: React.FC<Props> = () => {
  return <button>Copy</button>;
};
