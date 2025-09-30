import React from 'react';

export interface Props {
  text: string;
}

export const HandyCopyClipboard: React.FC<Props> = () => {
  return <button>Copy</button>;
};
