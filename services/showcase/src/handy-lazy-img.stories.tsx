import {HandyLazyImg} from '@handy-ones/handy-lazy-img';

export default {
    title: 'Handy lazy img'
}

export const Basic = () => (
    <div style={{height: '200vh', paddingTop: '100vh'}}>
        <p>Scroll down to see the lazy-loaded image</p>
        <HandyLazyImg
            src="https://picsum.photos/800/600"
            alt="Random landscape"
            width={800}
            height={600}
        />
    </div>
);

export const ResponsiveImages = () => (
    <div style={{height: '200vh', paddingTop: '100vh'}}>
        <p>Scroll down to see responsive image with srcSet</p>
        <HandyLazyImg
            src="https://picsum.photos/800/600?random=2"
            alt="Responsive image"
            srcSet={[
                {src: 'https://picsum.photos/400/300?random=2', width: 400},
                {src: 'https://picsum.photos/800/600?random=2', width: 800},
                {src: 'https://picsum.photos/1200/900?random=2', width: 1200}
            ]}
            width={800}
            height={600}
        />
    </div>
);

export const AspectRatio = () => (
    <div style={{height: '200vh', paddingTop: '100vh'}}>
        <p>Scroll down to see image with aspect ratio (prevents layout shift)</p>
        <HandyLazyImg
            src="https://picsum.photos/1600/900?random=3"
            alt="Image with aspect ratio"
            aspectRatio={16 / 9}
            style={{width: '100%', maxWidth: '800px'}}
        />
    </div>
);

export const ErrorHandling = () => (
    <div style={{height: '200vh', paddingTop: '100vh'}}>
        <p>Scroll down to see error state (broken image URL)</p>
        <HandyLazyImg
            src="https://invalid-url-that-will-fail.com/image.jpg"
            alt="Broken image"
            onError={(error: Error) => console.error('Image failed to load:', error)}
            width={800}
            height={600}
        />
    </div>
);

export const MultipleImages = () => (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px'}}>
        {Array.from({length: 12}).map((_, index) => (
            <HandyLazyImg
                key={index}
                src={`https://picsum.photos/400/300?random=${index + 10}`}
                alt={`Gallery image ${index + 1}`}
                aspectRatio={4 / 3}
                style={{width: '100%'}}
            />
        ))}
    </div>
);
