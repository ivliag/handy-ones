import React, { useState, useRef, useEffect } from 'react';

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

export const HandyCopyClipboard: React.FC<Props> = (props) => {
  const {
    text,
    children,
    timeout = 2000,
    onCopy,
    successMessage = 'Copied!',
    errorMessage = 'Failed to copy',
    disabled,
    ariaLabel = 'Copy to clipboard',
    className,
    ...restProps
  } = props;

  const [copyState, setCopyState] = useState<CopyState>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <button>Copy</button>;
};
