import React, {useState, useRef, useEffect} from 'react';
import {ImageSource, preloadImage, getSrcSet} from './utils';

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  blurHash?: string;
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
    placeholder,
    blurHash,
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
      .catch((error) => handleImageError(error));
  }, [isInView, src, srcSet, handleImageLoad, handleImageError]);

  return (
    <div ref={containerRef}>
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );
});

HandyLazyImg.displayName = 'HandyLazyImg';
