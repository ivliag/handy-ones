import React, {useState, useRef, useEffect} from 'react';
import {createCn} from 'bem-react-classname';

export interface Label {
    value: number;
    text?: React.ReactNode;
}

export interface Props {
    className?: string;
    min: number;
    max: number;
    value: number;
    step?: number;
    showGrid?: boolean;
    gridStep?: number;
    labels?: Label[];
    disabled?: boolean;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>,
        value: number
    ) => void;
}

const defaultProps: Partial<Props> = {
    step: 1,
    showGrid: true
};

const HandyRangeSlider = (props: Props) => {
    const cn = createCn('handy-range-slider', props.className);
    const thumbRef = useRef<HTMLSpanElement>(null);
    const [thumbSize, setThumbSize] = useState(0);

    useEffect(() => {
        setThumbSize(thumbRef.current?.getBoundingClientRect().width || 0)
    }, []);

    const getThumbCorrection = (value: number) => {
        const valuePercent = getValueAsPercent(value);
        return thumbSize / 100 * valuePercent;
    }

    const getLabelCorrection = (value: number) => {
        const valuePercent = getValueAsPercent(value);
        return thumbSize * ((50 - valuePercent) / 100);
    }

    const getValueAsPercent = (value: number) => {
        const {max, min} = props;
        const range = max - min;

        return ((value - min) / range) * 100;
    }

    const getLabelStyle = (value: number) => {
        const {max, min} = props;
        const valuePercent = getValueAsPercent(value);
        const correction = getLabelCorrection(value);

        const isBoundValue = value === min || value === max;

        return {
            left: `${valuePercent}%`,
            ...(!isBoundValue && {marginLeft: `${correction}px`})
        };
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(event, Number(event.target.value));
        }
    };

    const handleLabelClick = (event: React.MouseEvent<HTMLDivElement>, value: number) => {
        if (props.onChange) {
            props.onChange(event, value);
        }
    };

    const renderLabels = () => {
        const {min, max, labels} = props;

        if (props.labels?.length) {
            return (
                <div className={cn('labels')}>
                    {
                        (labels || []).map((label) => (
                            <div
                                key={label.value}
                                className={
                                    cn(
                                        'label',
                                        {first: label.value === min, last: label.value === max}
                                    )
                                }
                                style={getLabelStyle(label.value)}
                                onClick={(event) => handleLabelClick(event, label.value)}
                            >
                                {label.text || label.value}
                            </div>
                        ))
                    }
                </div>
            );
        }

        return null;
    }

    const renderGridLines = () => {
        const {value, max, min, gridStep} = props;

        const range = max - min;
        const step = gridStep || range / 10;
        const linesQty = Math.floor(range / (step));
        const linePercent = 100 / linesQty;

        return new Array(linesQty + 1).fill(null)
            .map((_, index) => (
                <span
                    key={index}
                    className={
                        cn(
                            'grid-line',
                            {
                                first: index === 0,
                                last: index === linesQty,
                                filled: getValueAsPercent(value) >= index * linePercent
                            }
                        )
                    }
                    style={{
                        left: `${index * linePercent}%`
                    }}
                />
            ));
    }

    const valuePercent = getValueAsPercent(props.value);
    const thumbCorrection = getThumbCorrection(props.value);
    const disabled = Boolean(props.disabled);

    return (
        <div className={cn()}>
            <div className={cn('controls')}>
                <div
                    className={cn('track', {disabled})}
                    style={{
                        width: `calc(${valuePercent}% + ${thumbSize - thumbCorrection}px)`
                    }}
                >
                    {
                        props.showGrid &&
                        <div className={cn('grid')}>
                            {renderGridLines()}
                        </div>
                    }
                    <span
                        ref={thumbRef}
                        className={cn('thumb', {disabled})}
                        style={{
                            left: `${valuePercent}%`,
                            transform: `translate(-${thumbCorrection}px)`
                        }}
                    />
                </div>
            </div>
            <input
                className={cn('control', {disabled})}
                type='range'
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                disabled={props.disabled}
                onChange={handleChange}
            />
            {renderLabels()}
        </div>
    );
}

HandyRangeSlider.defaultProps = defaultProps;
HandyRangeSlider.displayName = 'HandyRangeSlider';

const memoizedHandyRangeSlider = React.memo(HandyRangeSlider);
export {memoizedHandyRangeSlider as HandyRangeSlider};
