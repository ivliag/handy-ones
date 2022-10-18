<img
    width="200"
    alt="handy clamp"
    src="https://raw.githubusercontent.com/ivliag/handy-ones/master/services/showcase/src/assets/handy-clamp.png"
/>

React component to nicely cut extra text. It works with *lines* and is responsive of course. [Demo](https://ivliag.github.io/handy-ones/?story=handy-clamp--basic)

## Usage

#### Install it from npm
```
npm i @handy-ones/handy-clamp
```

#### Place your long text inside and set the number of *lines* to show
```typescript
import {HandyClamp} from '@handy-ones/handy-clamp';

export const MultilineText = () => (
    <HandyClamp lines={2}>
        Some long text nobody wants to read...
    </HandyClamp>
)
```

#### Customize expand control
```typescript
import {HandyClamp} from '@handy-ones/handy-clamp';

export const MultilineText = () => (
    <HandyClamp
        lines={2}
        expandControl={<a href='#'>Expand</a>}
    >
        Some long text nobody wants to read...
    </HandyClamp>
)
```

#### Or hide expand control, in this case text will be clickable
```typescript
import {HandyClamp} from '@handy-ones/handy-clamp';

export const MultilineText = () => (
    <HandyClamp
        lines={2}
        expandControl={null}
    >
        Some long text nobody wants to read...
    </HandyClamp>
)
```

## Demo
Please click `</>` button to see the demo souce code:
1. [Basic usage](https://ivliag.github.io/handy-ones/?story=handy-clamp--basic)
2. [Custom expand control](https://ivliag.github.io/handy-ones/?story=handy-clamp--custom-expand-control)
3. [Hidden expand control](https://ivliag.github.io/handy-ones/?story=handy-clamp--hidden-expand-control)

## API
#### `Props`
```typescript
interface HandyClampProps {
    className?: string; // additional css-class name
    lines?: number; // number of lines to show
    expandControl?: React.ReactElement | null; // control to show all the text
    children: React.ReactNode; // text to cut
}
```

## License
[MIT](https://github.com/ivliag/handy-ones/blob/master/packages/handy-clamp/LICENSE)
