<img
    width="200"
    alt="handy scroll strip"
    src="https://raw.githubusercontent.com/ivliag/handy-ones/master/services/showcase/src/assets/handy-scroll-strip.png"
/>

Scrollbar with some extras. [Demo](https://ivliag.github.io/handy-ones/?story=handy-scroll-strip--imperative-hanlers)

## Usage

#### Install it from npm
```
npm i @handy-ones/handy-scroll-strip
```

#### Place any inline content inside
```typescript
import {HandyScrollStrip} from '@handy-ones/handy-scroll-strip';

export const SomethingScrollable = () => (
    <HandyScrollStrip>
        <InlineElement />
        <InlineElement />
        <InlineElement />
    </HandyScrollStrip>
);
```

#### Use imperative handlers to control scroll position
```typescript
import {useRef} from 'react';
import {HandyScrollStrip} from '@handy-ones/handy-scroll-strip';

export const SomethingScrollable = () => {
    const stripRef = useRef<React.ElementRef<typeof HandyScrollStrip>>(null);

    return (
        <>
            <HandyScrollStrip ref={stripRef}>
                <InlineElement />
                <InlineElement />
                <InlineElement />
            </HandyScrollStrip>
            <button
                onClick={
                    () => {stripRef.current!.scrollTo(200)}
                }
            >
                Move forward
            </button>
        </>
    )
};
```

## Demo
Please click `</>` button to see the demo souce code:
1. [Basic usage](https://ivliag.github.io/handy-ones/?story=handy-scroll-strip--basic)
2. [Imperative handlers](https://ivliag.github.io/handy-ones/?story=handy-scroll-strip--imperative-hanlers)

## API
#### `Props`
```typescript
interface HandyScrollStripProps {
    className?: string; // additional css-class name
    children?: React.ReactNode; // inline content to scroll
    showFade?: boolean; // flag to show gradient on the container edges

    onScroll?: (event: React.UIEvent) => void;
    onScrollToRightEnd?: (event: React.UIEvent) => void;
    onScrollToLeftEnd?: (event: React.UIEvent) => void;
}
```

#### `ImperativeHandlers`
```typescript
interface ImperativeHandlers {
    getContainer: () => HTMLDivElement | null; // get scroll container Element
    getScrollLeft: () => number; // get scroll position from the left edge
    scrollTo: (value: number) => void; // scroll to a specific position in pixels
}
```

## License
[MIT](https://github.com/ivliag/handy-ones/blob/master/packages/handy-scroll-strip/LICENSE)
