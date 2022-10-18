import React, {useState, useRef, useImperativeHandle, useEffect} from 'react';
import {createCn} from 'bem-react-classname';

const SCROLL_FADE_GAP = 4;

export interface Props {
    className?: string;
    children?: React.ReactNode;
    showFade?: boolean;
    onScroll?: (event: React.UIEvent) => void;
    onScrollToRightEnd?: (event: React.UIEvent) => void;
    onScrollToLeftEnd?: (event: React.UIEvent) => void;
}

export interface ImperativeHandlers {
    getContainer: () => HTMLDivElement | null;
    getScrollLeft: () => number;
    scrollTo: (value: number) => void;
}

const HandyScrollStrip: React.ForwardRefRenderFunction<ImperativeHandlers, Props> = (props, forwardedRef) =>  {
    const cn = createCn('handy-scroll-strip', props.className);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [isLeftFadeVisible, setLeftFadeVisible] = useState(false);
    const [isRightFadeVisible, setRightFadeVisible] = useState(true);

    useEffect(() => {
        setInitialScrollFadeRightVisible();
    }, []);

    const setInitialScrollFadeRightVisible = () => {
        if (contentRef.current && (contentRef.current.clientWidth >= contentRef.current.scrollWidth)) {
            setRightFadeVisible(false);
        }
    };

    useImperativeHandle(forwardedRef, () => ({
        getContainer: () => contentRef?.current,
        getScrollLeft: () => contentRef?.current?.scrollLeft || 0,
        scrollTo: (value) => {
            if (contentRef.current) {
                contentRef.current.scrollTo({
                    left: value,
                    behavior: 'smooth'
                });
            }
        }
    }));

    const handleScroll = (event: React.UIEvent) => {
        const element = event.currentTarget;
        const {onScrollToRightEnd, onScrollToLeftEnd, onScroll} = props;

        if (element.scrollLeft > SCROLL_FADE_GAP) {
            setLeftFadeVisible(true);
        } else {
            setLeftFadeVisible(false);

            if (onScrollToLeftEnd) {
                onScrollToLeftEnd(event);
            }
        }

        if (element.scrollWidth - element.scrollLeft < element.clientWidth + SCROLL_FADE_GAP) {
            setRightFadeVisible(false);

            if (onScrollToRightEnd) {
                onScrollToRightEnd(event);
            }
        } else {
            setRightFadeVisible(true);
        }

        if (onScroll) {
            onScroll(event);
        }
    };

    return (
        <div className={cn()}>
            {props.showFade !== false && isLeftFadeVisible && <div className={cn('left-fade')} />}
            <div className={cn('content')} ref={contentRef} onScroll={handleScroll}>
                {props.children}
            </div>
            {props.showFade !== false && isRightFadeVisible && <div className={cn('right-fade')} />}
        </div>
    );
}

HandyScrollStrip.displayName = 'ScrollStrip';

const memoizedScrollStrip = React.memo(React.forwardRef(HandyScrollStrip));
export {memoizedScrollStrip as HandyScrollStrip};
