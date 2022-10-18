import {useRef} from 'react';
import {HandyScrollStrip} from '@handy-ones/handy-scroll-strip';

export default {
    title: 'Handy Scroll Strip'
}

const getRandomInt = (from: number, to: number) => {
    const k = to - from;
    return Math.floor(Math.random() * k) + from;
}

const getItemStyle = () => {
    const style: React.CSSProperties = {
        height: 200,
        flexShrink: 0,
        width: getRandomInt(100, 300),
        color: "#aaa",
        background: '#eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: '2px',
        borderStyle: 'solid',
        marginRight: '-2px'
    }

    return style;
}

export const Basic = () => {
    return (
        <HandyScrollStrip>
            <div style={{display: 'flex'}}>
                {
                    new Array(10).fill(null)
                        .map((_, index) => (
                            <div
                                key={index}
                                style={getItemStyle()}
                            >
                                {index + 1}
                            </div>
                        ))
                }
            </div>
        </HandyScrollStrip>
    );
};

export const ImperativeHanlers = () => {
    const stripRef = useRef<React.ElementRef<typeof HandyScrollStrip>>(null);

    const handleLeftClick = () => {
        const scrollLeft = stripRef.current!.getScrollLeft();
        stripRef.current!.scrollTo(scrollLeft - 500)
    }

    const handleRightClick = () => {
        const scrollLeft = stripRef.current!.getScrollLeft();
        stripRef.current!.scrollTo(scrollLeft + 500);
    }

    return (
        <>
            <HandyScrollStrip ref={stripRef}>
                <div style={{display: 'flex'}}>
                    {
                        new Array(10).fill(null)
                            .map((_, index) => (
                                <div
                                    key={index}
                                    style={getItemStyle()}
                                >
                                    {index + 1}
                                </div>
                            ))
                    }
                </div>
            </HandyScrollStrip>
            <div style={{marginTop: '20px'}}>
                <button onClick={handleLeftClick}>
                    {'< left'}
                </button>
                <button onClick={handleRightClick}>
                    {'right >'}
                </button>
            </div>
        </>
    );
};
