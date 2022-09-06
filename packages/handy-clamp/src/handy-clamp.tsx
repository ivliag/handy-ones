import React, {useEffect, useRef, useState} from 'react';
import {joinClassNames} from './utils';

import './handy-clamp.css';

export interface Props {
    className?: string;
    lines?: number;
    expandControl?: React.ReactElement;
    children: React.ReactNode;
}

const HandyClamp = (props: Props) => {
    const textBlockRef = useRef<HTMLDivElement>(null);

    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [isOverflowing, setOwerflowing] = useState<boolean>(false);

    const handleExpandClick = () => {
        setExpanded(true);
    };

    const handleContainerClick = () => {
        if (!props.expandControl) {
            handleExpandClick();
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

    return (
        <div
            className={joinClassNames('handy-clamp', props.className)}
            onClick={handleContainerClick}
        >
            <div
                className='handy-clamp__text'
                style={isExpanded ? undefined : {WebkitLineClamp: props.lines}}
                ref={textBlockRef}
            >
                {props.children}
            </div>
            {
                !isExpanded && isOverflowing && props.expandControl &&
                React.cloneElement(props.expandControl, {onClick: handleExpandClick})
            }
        </div>
    );
}

const defaultProps: Partial<Props> = {
    lines: 1,
    expandControl: <button className={'handy-clamp__control'}>Expand</button>
}


HandyClamp.defaultProps = defaultProps;

HandyClamp.displayName = 'HandyClamp';

export {HandyClamp};
