export const joinClassNames = (...classNames: (string | undefined)[]) => classNames.filter(Boolean).join(' ');
