# HandyCopyClipboard Implementation Task

## Overview
Create a new React component called `handy-copy-clipboard` for the handy-ones monorepo. This component provides flexible copy-to-clipboard functionality with visual state feedback, accessibility support, and multiple usage patterns (button or wrapper).

## Component Features
- **Multiple Modes**: Works as a button component or wrapper around existing elements
- **Visual State Feedback**: Automatic state transitions (idle → copying → success → error)
- **Flexible Content**: Different text/icons for each state (e.g., "Copy" → "Copied!")
- **Flexible Source**: Copy from text prop, child text content, or custom value
- **Auto-Reset**: Configurable timeout to return to idle state after success/error
- **Callback Support**: onCopy handlers for success/error with custom logic
- **Accessibility**: Proper ARIA labels, live regions, and keyboard support
- **TypeScript**: Fully typed with comprehensive prop interfaces

## Technical Requirements
- TypeScript with React
- Follow existing component patterns in the monorepo (handy-lazy-img, handy-range-slider, handy-scroll-strip)
- Use BEM methodology for CSS class names (with bem-react-classname if needed)
- Include comprehensive Storybook demos
- Write detailed README documentation
- Export memoized component with displayName

## Project Context
This is a monorepo using:
- Workspaces for packages and services
- Turbo for build orchestration
- Storybook for component showcase
- Individual npm packages for each component

Reference existing components in `packages/` directory for structure and patterns.

---

## Step 1: Project Structure Setup
- Create `packages/handy-copy-clipboard` directory
- Set up `package.json` with dependencies (react, react-dom as peer deps)
- Create `tsconfig.json` for TypeScript configuration
- Set up basic file structure:
  - `src/index.ts` (main entry point)
  - `src/handy-copy-clipboard.tsx` (main component)
  - `src/utils.ts` (utility functions)
  - `src/handy-copy-clipboard.css` (component styles)

## Step 2: Utility Functions (`utils.ts`)
Implement helper functions:
- **`copyToClipboard(text: string): Promise<void>`**
  - Uses modern Clipboard API (navigator.clipboard.writeText)
  - Falls back to legacy document.execCommand('copy') for older browsers
  - Returns promise that resolves on success, rejects on error

- **`joinClassNames(...classes: (string | undefined | false)[]): string`**
  - Combines multiple class names
  - Filters out undefined/null/false values
  - Returns single space-separated string

## Step 3: Type Definitions (`handy-copy-clipboard.tsx`)
Define TypeScript interfaces:
- **`CopyState`** type: `'idle' | 'copying' | 'success' | 'error'`
- **`Props`** interface:
  - `text: string` (required - text to copy)
  - `children?: React.ReactNode | ((state: CopyState) => React.ReactNode)` (render prop support)
  - `timeout?: number` (auto-reset delay in ms, default: 2000)
  - `onCopy?: (success: boolean, error?: Error) => void` (callback)
  - `successMessage?: string` (default: "Copied!")
  - `errorMessage?: string` (default: "Failed to copy")
  - `disabled?: boolean`
  - `className?: string`
  - `ariaLabel?: string` (default: "Copy to clipboard")
  - Standard button attributes via `React.ButtonHTMLAttributes<HTMLButtonElement>`

## Step 4: Component State and Refs (`handy-copy-clipboard.tsx`)
Set up component foundation:
- Initialize state: `const [copyState, setCopyState] = useState<CopyState>('idle')`
- Create ref for timeout: `const timeoutRef = useRef<NodeJS.Timeout | null>(null)`
- Set up cleanup effect to clear timeout on unmount

## Step 5: Copy Handler Logic (`handy-copy-clipboard.tsx`)
Implement the main copy function:
- **`handleCopy()`** async function:
  - Set state to 'copying'
  - Call `copyToClipboard(text)` utility
  - On success:
    - Set state to 'success'
    - Call `onCopy(true)` if provided
    - Set timeout to reset state to 'idle'
  - On error:
    - Set state to 'error'
    - Call `onCopy(false, error)` if provided
    - Set timeout to reset state to 'idle'
  - Clear any existing timeout before setting new one

## Step 6: Render Logic (`handy-copy-clipboard.tsx`)
Implement component rendering:
- Determine button content:
  - If children is a function, call it with current state
  - If children is provided, render it
  - Otherwise, show state-based default text:
    - 'idle': "Copy"
    - 'copying': "Copying..."
    - 'success': successMessage prop
    - 'error': errorMessage prop
- Render button element with:
  - onClick handler → handleCopy
  - disabled when state is 'copying' or disabled prop is true
  - Dynamic className based on state and custom className
  - ARIA attributes (aria-label, aria-live for feedback)
  - All passed-through button attributes

## Step 7: Component Export and Memoization (`handy-copy-clipboard.tsx`)
Complete the component:
- Wrap component with `React.memo` for performance
- Add `displayName = 'HandyCopyClipboard'`
- Create barrel export in `index.ts`:
  ```ts
  export { HandyCopyClipboard } from './handy-copy-clipboard';
  export type { Props as HandyCopyClipboardProps } from './handy-copy-clipboard';
  ```

## Step 8: Styling (`handy-copy-clipboard.css`)
Create base styles with BEM methodology:
- `.handy-copy-clipboard` - Base button styles
- `.handy-copy-clipboard--idle` - Idle state styles
- `.handy-copy-clipboard--copying` - Copying state (cursor: wait)
- `.handy-copy-clipboard--success` - Success state (green feedback)
- `.handy-copy-clipboard--error` - Error state (red feedback)
- `.handy-copy-clipboard--disabled` - Disabled state
- Ensure styles are minimal and easily customizable

## Step 9: Storybook Demo (`services/showcase/src/handy-copy-clipboard.stories.tsx`)
Create interactive demo stories:
- Set up story structure with default export:
  - `title: 'Handy copy clipboard'`
- Create demo stories:
  - **Basic** - Simple copy button with default text
  - **CustomContent** - Button with custom static content
  - **RenderProp** - Uses render prop pattern to show different content per state
  - **WithCallbacks** - Demonstrates onCopy callback with console logs
  - **CustomTimeout** - Shows custom auto-reset timeout
  - **CodeBlock** - Real-world example: copy button for code snippet
  - **EmailAddress** - Copy email address with icon
  - **Disabled** - Disabled state demonstration

## Step 10: Documentation (`packages/handy-copy-clipboard/README.md`)
Create comprehensive documentation:
- **Header** with component name and brief description
- **Demo link** to showcase page
- **Features list** - Bullet points of key features
- **Installation**:
  - Command: `npm i @handy-ones/handy-copy-clipboard`
  - Import example
- **Usage Examples**:
  - Basic usage (simple button)
  - Render prop pattern (state-based rendering)
  - With callbacks (onCopy handler)
  - Custom messages (success/error text)
  - Custom timeout
  - Real-world examples (code block, email, URL)
- **API Reference**:
  - Complete Props table with descriptions and default values
  - CopyState type documentation
- **Browser Support** - Note about Clipboard API and fallback
- **Accessibility** - ARIA features and keyboard support
- **License** - MIT

## Step 11: Package Configuration
- Update `package.json` with proper metadata:
  - name: `@handy-ones/handy-copy-clipboard`
  - version: `0.1.0`
  - description
  - keywords: `['react', 'clipboard', 'copy', 'copy-to-clipboard', 'utility']`
  - main, module, types entries
  - peerDependencies: react, react-dom
- Ensure build scripts are configured (if using turbo)
