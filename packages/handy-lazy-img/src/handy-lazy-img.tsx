import React, {useState, useRef} from 'react';
import {ImageSource} from './utils';

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

  return <img ref={imgRef} src={src} alt={alt} />;
});

HandyLazyImg.displayName = 'HandyLazyImg';
