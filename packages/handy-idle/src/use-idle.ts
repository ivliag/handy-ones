import { useEffect, useRef, useState } from 'react';

export interface UseIdleOptions {
    timeout: number;
    onIdle?: () => void;
    onActive?: () => void;
    events?: string[];
}

const DEFAULT_EVENTS = [
    'mousedown',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart',
    'wheel',
];

export function useIdle(options: number | UseIdleOptions): boolean {
    const timeout = typeof options === 'number' ? options : options.timeout;
    const onIdle = typeof options === 'object' ? options.onIdle : undefined;
    const onActive = typeof options === 'object' ? options.onActive : undefined;
    const events = typeof options === 'object' && options.events ? options.events : DEFAULT_EVENTS;

    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        const handleActivity = () => {
            if (isIdle && onActive) {
                onActive();
            }
            setIsIdle(false);

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                setIsIdle(true);
                if (onIdle) {
                    onIdle();
                }
            }, timeout);
        };

        // Initial timer setup
        handleActivity();

        // Add event listeners
        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        // Cleanup
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [timeout, isIdle, onIdle, onActive, events]);

    return isIdle;
}
