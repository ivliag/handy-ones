import React from 'react';

export interface Props {
  src: string;
  alt: string;
}

export const HandyLazyImg = React.memo<Props>((props) => {
  return <img src={props.src} alt={props.alt} />;
});

HandyLazyImg.displayName = 'HandyLazyImg';
