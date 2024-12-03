import React, {ButtonHTMLAttributes, MouseEvent, useEffect, useRef, useState} from 'react';
import {joinClassNames} from './utils';

export interface Props {
    className?: string;
    lines?: number;
    expandControl?: React.ReactElement<ButtonHTMLAttributes<HTMLButtonElement>> | null;
    children: React.ReactNode;
}

const defaultProps: Partial<Props> = {
    lines: 1,
    expandControl: <button className={'handy-clamp__control'}>Expand</button>
}

const HandyClamp = (props: Props) => {
    const textBlockRef = useRef<HTMLDivElement>(null);

    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [isOverflowing, setOwerflowing] = useState<boolean>(false);

    const handleExpandClick = (event?: MouseEvent) => {
        event?.preventDefault();
        setExpanded(true);
    };

    const handleContainerClick = () => {
        if (!props.expandControl) {
            setExpanded(true);
        }
    }

    const handleResize = () => {
        const textBlockElement = textBlockRef.current;

        if (textBlockElement) {
            setOwerflowing(
                textBlockElement.scrollHeight > textBlockElement.clientHeight
            )
        }
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(textBlockRef.current!);
        return () => resizeObserver.disconnect();
    }, []);

    const isTextClickable = !isExpanded && isOverflowing && !props.expandControl;
    const isExpandControlShown = !isExpanded && isOverflowing && props.expandControl;

    return (
        <div
            className={joinClassNames('handy-clamp', props.className)}
            onClick={handleContainerClick}
        >
            <div
                className={joinClassNames('handy-clamp__text', isTextClickable ? 'handy-clamp__text_clickable' : undefined)}
                style={isExpanded ? undefined : {WebkitLineClamp: props.lines}}
                ref={textBlockRef}
            >
                {props.children}
            </div>
            {
                isExpandControlShown &&
                React.cloneElement(props.expandControl!, {onClick: handleExpandClick})
            }
        </div>
    );
}

HandyClamp.defaultProps = defaultProps;
HandyClamp.displayName = 'HandyClamp';

const memoizedHandyClamp = React.memo(HandyClamp);
export {memoizedHandyClamp as HandyClamp};
