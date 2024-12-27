import React, {useState, useRef, useEffect} from 'react';
import {ImageSource, preloadImage, getSrcSet, joinClassNames, getImageDimensions} from './utils';

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

export interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  threshold?: number;
  rootMargin?: string;
  srcSet?: ImageSource[];
  aspectRatio?: number;
  onLoad?: (event: Event) => void;
  onError?: (error: Error) => void;
}

export const HandyLazyImg = React.memo<Props>((props) => {
  const {
    src,
    alt,
    threshold = 0.1,
    rootMargin = '50px',
    srcSet,
    aspectRatio,
    onLoad,
    onError,
    className,
    width,
    height,
    ...restProps
  } = props;

  const [isInView, setIsInView] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Event handler for successful image load
  const handleImageLoad = (event: Event) => {
    setLoadingState('loaded');
    if (onLoad) {
      onLoad(event);
    }
  };

  // Event handler for image load error
  const handleImageError = (error: Error) => {
    setLoadingState('error');
    if (onError) {
      onError(error);
    }
  };

  // Set up IntersectionObserver to detect when image enters viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Trigger image loading when component enters viewport
  useEffect(() => {
    if (!isInView) return;

    setLoadingState('loading');

    const srcSetString = srcSet ? getSrcSet(srcSet) : undefined;

    preloadImage(src, srcSetString)
      .then(() => handleImageLoad(new Event('load')))
      .catch((error: Error) => handleImageError(error));
  }, [isInView, src, srcSet, handleImageLoad, handleImageError]);

  // Calculate dimensions for aspect ratio box
  const numWidth = typeof width === 'number' ? width : undefined;
  const numHeight = typeof height === 'number' ? height : undefined;
  const dimensions = getImageDimensions(numWidth, numHeight, aspectRatio);

  // Get srcset string if provided
  const srcSetString = srcSet ? getSrcSet(srcSet) : undefined;

  // Build container style
  const containerStyle: React.CSSProperties = {};
  if (dimensions.paddingBottom) {
    // Using padding-bottom technique for aspect ratio
    containerStyle.paddingBottom = dimensions.paddingBottom;
  } else if (dimensions.width && dimensions.height) {
    // Using explicit dimensions
    containerStyle.width = dimensions.width;
    containerStyle.height = dimensions.height;
  }

  return (
    <div
      ref={containerRef}
      className={joinClassNames('handy-lazy-img', className)}
      style={containerStyle}
    >
      {/* Show image only when in view and loaded */}
      {loadingState === 'loaded' && (
        <img
          ref={imgRef}
          className="handy-lazy-img__img"
          src={src}
          srcSet={srcSetString}
          alt={alt}
          {...restProps}
        />
      )}

      {/* Error state */}
      {loadingState === 'error' && (
        <div className="handy-lazy-img__error">Failed to load image</div>
      )}
    </div>
  );
});

HandyLazyImg.displayName = 'HandyLazyImg';
