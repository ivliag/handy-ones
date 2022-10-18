<img
    width="200"
    alt="handy svg"
    src="https://raw.githubusercontent.com/ivliag/handy-ones/master/services/showcase/src/assets/handy-svg.png"
/>

External SVGs that you can style. [Demo](https://ivliag.github.io/handy-ones/?story=handy-svg--colored)

## How it works
1. Fetches your SVGs in browser with `fetch` request. And caches of course.
2. Puts it into [sprite](https://daily-dev-tips.com/posts/svg-sprites/) that is stored in your `body`.
3. Provides you with the React component and standalone API to use this icon in your code.
4. That's it. You now may use all the fancy css-styling like if it was inline SVG.

## Why
1. Sprites may become huge, containing hundreds of icons, and you don't need all of your icons on every page.
2. Styling with css is a must-have, and this is the only way of getting it except for inlining.
3. Inlining SVGs with React might be painful (there is a [tool](https://react-svgr.com/) though), it also increases the bundle size a   nd just doesn't feel right.

## Usage

#### Install it from npm
```
npm i @handy-ones/handy-svg
```

#### React
```typescript

import {HandySvg} from '@handy-ones/handy-svg';
import iconSrc from './icon.svg';

export const Icon = () => (
    <HandySvg
        src={iconSrc}
        width="32"
        height="32"
    />
);
```

I assume here that you use `file-loader` for bundling your svg-files and get public url to SVG file in `iconSrc`, like so:
```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};
```

But in fact there is no difference for the **handy-svg** where you get your SVGs urls from.

#### Standalone
You may also use **handy-svg** without React at all.

```typescript
import {injector} from '@handy-ones/handy-svg';

const src = "https://cdn-server.net/icon.svg";

// Fetches svg content and puts it to sprite
injector.load(src);

// Gets the id of your svg in sprite
const id = injector.getId(src);

// Then you can use it at your will
const svg = `<svg><use href="#${id}" /></svg>`;
```

## Demo
Please click `</>` button to see the demo souce code:
1. [Basic usage](https://ivliag.github.io/handy-ones/?story=handy-svg--basic)
2. [With `fill` color set in `css`](https://ivliag.github.io/handy-ones/?story=handy-svg--colored)
3. [Without `React`](https://ivliag.github.io/handy-ones/?story=handy-svg--without-react)

## API
#### `<HandySvg />`
```typescript
import {HandySvg} from '@handy-ones/handy-svg';

interface HandySvgProps {
  src: string; // your icon url
  loadTimeot?: number; // load timeout. 4800 by default
  loadRetryCount?: number; // load retry. 2 by default
  [key: string]: string | number | undefined; // any extra props will be passed to svg tag
}

<HandySvg {...props} />
```

#### `injector.load()`
```typescript
import {injector} from '@handy-ones/handy-svg';

interface LoadOptions {
    flushImmediate?: boolean; // inject icon to the body without debouncing
    timeout?: number; // load timeout. 4800 by default
    retryCount?: number; // load retry. 2 by default
}

injector.load(src: string, options: LoadOptions): Promise<void>;
```

#### `injector.getId()`
```typescript
import {injector} from '@handy-ones/handy-svg';

injector.getId(src: string): string;
```

## CSP
You should add hostnames of your icons to the [connect-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) directive of your [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header for this to work properly.

## License
[MIT](https://github.com/ivliag/handy-ones/blob/master/packages/handy-svg/LICENSE)
