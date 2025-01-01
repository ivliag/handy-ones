# HandyCopyClipboard

React component for flexible copy-to-clipboard functionality with visual state feedback and accessibility support. [Demo](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--basic)

## Features

- 📋 **Easy to Use** - Simple API for copying text to clipboard
- 🎨 **Visual Feedback** - Automatic state transitions (idle → copying → success → error)
- 🔄 **Flexible Rendering** - Support for render props and custom content
- ⚡ **Auto-Reset** - Configurable timeout to return to idle state
- 🎯 **Callbacks** - Success/error handlers for custom logic
- ♿ **Accessible** - ARIA labels, live regions, and keyboard support
- 🌐 **Browser Fallback** - Modern Clipboard API with legacy execCommand fallback
- 💪 **TypeScript** - Full type safety with comprehensive interfaces

## Usage

#### Install it from npm
```bash
npm i @handy-ones/handy-copy-clipboard
```

#### Basic usage
```typescript
import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';
import '@handy-ones/handy-copy-clipboard/dist/handy-copy-clipboard.css';

export const CopyButton = () => (
    <HandyCopyClipboard text="Hello, World!">
        Copy
    </HandyCopyClipboard>
);
```

#### Render prop pattern (state-based rendering)
```typescript
import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';

export const StatefulCopyButton = () => (
    <HandyCopyClipboard text="Code snippet here">
        {(state) => {
            switch (state) {
                case 'copying':
                    return '⏳ Copying...';
                case 'success':
                    return '✅ Copied!';
                case 'error':
                    return '❌ Failed';
                default:
                    return '📋 Copy Code';
            }
        }}
    </HandyCopyClipboard>
);
```

#### With callbacks
```typescript
import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';

export const CopyWithCallback = () => (
    <HandyCopyClipboard
        text="Important data"
        onCopy={(success, error) => {
            if (success) {
                console.log('Copied successfully!');
            } else {
                console.error('Copy failed:', error);
            }
        }}
    >
        Copy
    </HandyCopyClipboard>
);
```

#### Custom messages and timeout
```typescript
import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';

export const CustomizedCopyButton = () => (
    <HandyCopyClipboard
        text="Custom message example"
        timeout={3000}
        successMessage="Copied to clipboard!"
        errorMessage="Oops, something went wrong"
    >
        Copy Text
    </HandyCopyClipboard>
);
```

#### Real-world example: Code block
```typescript
import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';

export const CodeBlock = ({ code }: { code: string }) => (
    <div style={{ position: 'relative', backgroundColor: '#1e1e1e', padding: '20px' }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <HandyCopyClipboard text={code}>
                {(state) => state === 'success' ? '✓ Copied' : 'Copy Code'}
            </HandyCopyClipboard>
        </div>
        <pre>{code}</pre>
    </div>
);
```

#### Real-world example: Copy email
```typescript
import { HandyCopyClipboard } from '@handy-ones/handy-copy-clipboard';

export const EmailContact = () => (
    <HandyCopyClipboard
        text="contact@example.com"
        successMessage="Email copied!"
    >
        📧 contact@example.com
    </HandyCopyClipboard>
);
```

## Demo

Please click `</>` button to see the demo source code:
1. [Basic usage](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--basic)
2. [Custom content](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--custom-content)
3. [Render prop](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--render-prop)
4. [With callbacks](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--with-callbacks)
5. [Custom timeout](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--custom-timeout)
6. [Code block](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--code-block)
7. [Email address](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--email-address)
8. [Disabled state](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--disabled)
9. [Multiple buttons](https://ivliag.github.io/handy-ones/?story=handy-copy-clipboard--multiple-buttons)

## API

#### `Props`
```typescript
interface HandyCopyClipboardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string; // Text to copy to clipboard (required)
    children?: React.ReactNode | ((state: CopyState) => React.ReactNode); // Button content or render function
    timeout?: number; // Auto-reset delay in milliseconds (default: 2000)
    onCopy?: (success: boolean, error?: Error) => void; // Callback on copy attempt
    successMessage?: string; // Success state text (default: "Copied!")
    errorMessage?: string; // Error state text (default: "Failed to copy")
    disabled?: boolean; // Disable the button
    ariaLabel?: string; // ARIA label for accessibility (default: "Copy to clipboard")
    className?: string; // Additional CSS class name
}
```

#### `CopyState` type
```typescript
type CopyState = 'idle' | 'copying' | 'success' | 'error';
```

## Browser Support

This component uses the modern [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) with automatic fallback to the legacy `document.execCommand('copy')` for older browsers.

- Modern browsers: Uses `navigator.clipboard.writeText()`
- Legacy browsers: Falls back to `document.execCommand('copy')`

## Accessibility

- ♿ Proper ARIA labels (`aria-label`, `aria-live`)
- ⌨️ Full keyboard support (Space and Enter keys)
- 🔊 Screen reader announcements for state changes
- 🎯 Focus management with visible focus indicators

## Styling

The component includes minimal base styles using BEM methodology. You can customize the appearance by:

1. Overriding the default CSS classes:
   - `.handy-copy-clipboard` - Base button
   - `.handy-copy-clipboard--idle` - Idle state
   - `.handy-copy-clipboard--copying` - Copying state
   - `.handy-copy-clipboard--success` - Success state
   - `.handy-copy-clipboard--error` - Error state
   - `.handy-copy-clipboard--disabled` - Disabled state

2. Using the `className` prop to add custom classes

3. Using the `style` prop for inline styles

## License

[MIT](https://github.com/ivliag/handy-ones/blob/master/packages/handy-copy-clipboard/LICENSE)
