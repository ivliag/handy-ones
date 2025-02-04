# handy-idle

A React hook to detect user idle state with configurable timeout and callbacks.

## Installation

```bash
npm install @handy-ones/handy-idle
```

## Usage

### Basic Usage

```tsx
import { useIdle } from '@handy-ones/handy-idle';

function App() {
  const isIdle = useIdle(30000); // 30 seconds

  return (
    <div>
      User is: {isIdle ? 'Idle' : 'Active'}
    </div>
  );
}
```

### With Callbacks

```tsx
import { useIdle } from '@handy-ones/handy-idle';

function App() {
  const isIdle = useIdle({
    timeout: 30000,
    onIdle: () => {
      console.log('User became idle');
    },
    onActive: () => {
      console.log('User became active');
    }
  });

  return (
    <div>
      User is: {isIdle ? 'Idle' : 'Active'}
    </div>
  );
}
```

### Custom Events

By default, the hook listens to `mousedown`, `mousemove`, `keydown`, `scroll`, `touchstart`, and `wheel` events. You can customize which events to track:

```tsx
import { useIdle } from '@handy-ones/handy-idle';

function App() {
  const isIdle = useIdle({
    timeout: 60000,
    events: ['mousedown', 'keydown'] // Only track mouse clicks and key presses
  });

  return (
    <div>
      User is: {isIdle ? 'Idle' : 'Active'}
    </div>
  );
}
```

## API

### `useIdle(options)`

#### Parameters

- `options`: `number | UseIdleOptions`
  - If a number is provided, it will be used as the timeout in milliseconds
  - If an object is provided, it can have the following properties:
    - `timeout` (required): `number` - Idle timeout in milliseconds
    - `onIdle` (optional): `() => void` - Callback when user becomes idle
    - `onActive` (optional): `() => void` - Callback when user becomes active
    - `events` (optional): `string[]` - Array of event names to track (default: `['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'wheel']`)

#### Returns

- `boolean` - `true` if the user is idle, `false` otherwise

## Examples

### Session Timeout

```tsx
import { useIdle } from '@handy-ones/handy-idle';

function SessionManager() {
  const [sessionActive, setSessionActive] = useState(true);

  useIdle({
    timeout: 300000, // 5 minutes
    onIdle: () => {
      setSessionActive(false);
      // Log out user or show warning
    }
  });

  if (!sessionActive) {
    return <div>Session expired</div>;
  }

  return <div>Session active</div>;
}
```

### Idle Warning

```tsx
import { useIdle } from '@handy-ones/handy-idle';

function IdleWarning() {
  const isIdle = useIdle(60000); // 1 minute

  return (
    <div>
      {isIdle && (
        <div className="warning">
          You've been idle for a while. Move your mouse to stay active.
        </div>
      )}
    </div>
  );
}
```

## License

MIT
