import React, { useState, useRef, useEffect } from 'react';
import { copyToClipboard, joinClassNames } from './utils';

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

  // Determine button content
  let buttonContent: React.ReactNode;
  if (typeof children === 'function') {
    buttonContent = children(copyState);
  } else if (children) {
    buttonContent = children;
  } else {
    // Default state-based content
    switch (copyState) {
      case 'copying':
        buttonContent = 'Copying...';
        break;
      case 'success':
        buttonContent = successMessage;
        break;
      case 'error':
        buttonContent = errorMessage;
        break;
      default:
        buttonContent = 'Copy';
    }
  }

  const isDisabled = disabled || copyState === 'copying';

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-live="polite"
      className={joinClassNames(
        'handy-copy-clipboard',
        `handy-copy-clipboard--${copyState}`,
        isDisabled && 'handy-copy-clipboard--disabled',
        className
      )}
      {...restProps}
    >
      {buttonContent}
    </button>
  );
};
