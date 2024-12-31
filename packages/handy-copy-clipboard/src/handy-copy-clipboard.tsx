import React, { useState, useRef, useEffect } from 'react';
import { copyToClipboard } from './utils';

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

  // Handle copy action
  const handleCopy = async () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCopyState('copying');

    try {
      await copyToClipboard(text);
      setCopyState('success');

      if (onCopy) {
        onCopy(true);
      }

      // Reset to idle after timeout
      timeoutRef.current = setTimeout(() => {
        setCopyState('idle');
      }, timeout);
    } catch (error) {
      setCopyState('error');

      if (onCopy) {
        onCopy(false, error as Error);
      }

      // Reset to idle after timeout
      timeoutRef.current = setTimeout(() => {
        setCopyState('idle');
      }, timeout);
    }
  };

  return <button>Copy</button>;
};
