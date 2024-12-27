# HandyLazyImg

React component for intelligent image lazy-loading with IntersectionObserver API. Features responsive images (srcset) and layout shift prevention. [Demo](https://ivliag.github.io/handy-ones/?story=handy-lazy-img--basic)

## Usage

#### Install it from npm
```
npm i @handy-ones/handy-lazy-img
```

#### Basic lazy-loaded image
```typescript
import {HandyLazyImg} from '@handy-ones/handy-lazy-img';

export const LazyImage = () => (
    <HandyLazyImg
        src="https://example.com/image.jpg"
        alt="Description of image"
        width={800}
        height={600}
    />
)
```

#### Responsive images with srcSet
```typescript
import {HandyLazyImg} from '@handy-ones/handy-lazy-img';

export const ResponsiveImage = () => (
    <HandyLazyImg
        src="https://example.com/image-800.jpg"
        alt="Description of image"
        srcSet={[
            {src: 'https://example.com/image-400.jpg', width: 400},
            {src: 'https://example.com/image-800.jpg', width: 800},
            {src: 'https://example.com/image-1200.jpg', width: 1200}
        ]}
        width={800}
        height={600}
    />
)
```

#### Prevent layout shift with aspect ratio
```typescript
import {HandyLazyImg} from '@handy-ones/handy-lazy-img';

export const FixedAspectRatio = () => (
    <HandyLazyImg
        src="https://example.com/image.jpg"
        alt="Description of image"
        aspectRatio={16 / 9}
        style={{width: '100%'}}
    />
)
```

#### Error handling
```typescript
import {HandyLazyImg} from '@handy-ones/handy-lazy-img';

export const ImageWithErrorHandling = () => (
    <HandyLazyImg
        src="https://example.com/image.jpg"
        alt="Description of image"
        onError={(error) => console.error('Image failed to load:', error)}
        onLoad={(event) => console.log('Image loaded successfully')}
    />
)
```

## Demo
Please click `</>` button to see the demo source code:
1. [Basic usage](https://ivliag.github.io/handy-ones/?story=handy-lazy-img--basic)
2. [Responsive images](https://ivliag.github.io/handy-ones/?story=handy-lazy-img--responsive-images)
3. [Aspect ratio](https://ivliag.github.io/handy-ones/?story=handy-lazy-img--aspect-ratio)
4. [Error handling](https://ivliag.github.io/handy-ones/?story=handy-lazy-img--error-handling)
5. [Multiple images](https://ivliag.github.io/handy-ones/?story=handy-lazy-img--multiple-images)

## API
#### `Props`
```typescript
interface HandyLazyImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string; // Image source URL (required)
    alt: string; // Alt text for accessibility (required)
    threshold?: number; // IntersectionObserver threshold (default: 0.1)
    rootMargin?: string; // IntersectionObserver root margin (default: '50px')
    srcSet?: ImageSource[]; // Array of {src, width} for responsive images
    aspectRatio?: number; // Aspect ratio (width/height) to prevent layout shift
    onLoad?: (event: Event) => void; // Callback when image loads successfully
    onError?: (error: Error) => void; // Callback when image fails to load
    className?: string; // Additional CSS class name
    width?: number; // Image width
    height?: number; // Image height
}

interface ImageSource {
    src: string; // Image URL
    width: number; // Image width descriptor
}
```

## License
[MIT](https://github.com/ivliag/handy-ones/blob/master/packages/handy-lazy-img/LICENSE)
