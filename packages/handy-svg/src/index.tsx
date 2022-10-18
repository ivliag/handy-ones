import {useRef, useEffect} from 'react';
import {injector} from './lib/injector';

type Props = {
    src: string;
    loadTimeot?: number;
    loadRetryCount?: number;
    [key: string]: object | string | number | undefined;
}

const HandySvg = (props: Props) => {
    const {src, loadTimeot, loadRetryCount, ...restProps} = props;
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            injector.load(
                src,
                {timeout: loadTimeot, retryCount: loadRetryCount}
            ).catch(() => ({}));

            isFirstRun.current = false;
            return;
        }

        injector.load(
            src,
            {timeout: loadTimeot, retryCount: loadRetryCount, flushImmediate: true}
        ).catch(() => ({}));
    }, [src]);

    return (
        <svg {...restProps}>
            <use href={`#${injector.getId(src)}`} />
        </svg>
    )
};

HandySvg.displayName = 'HandySvg';
export {injector, HandySvg};
