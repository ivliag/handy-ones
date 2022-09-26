import React from 'react';

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
    onChange?: (event: React.ChangeEvent | React.MouseEvent) => void;
}

const defaultProps: Partial<Props> = {
    step: 1,
    showGrid: true
};

const THUMB_SIZE = 48;

const createCn = (blockName: string) => {
    return (
        elementName?: string | Record<string, boolean | string>,
        modifiers?: Record<string, boolean | string>
    ) => {
        const base = elementName && typeof elementName === 'string' ? `${blockName}__${elementName}` : blockName;
        const resolvedModifiers = modifiers ? modifiers : typeof elementName === 'object' ? elementName : undefined

        const result = [base];

        if (resolvedModifiers) {
            Object.entries(resolvedModifiers)
                .forEach(([key, value]) => {
                    if (typeof value === 'boolean' && value) {
                        result.push(`${base}_${key}`);
                    }

                    if (typeof value === 'string') {
                        result.push(`${base}_${key}_${value}`);
                    }
                })
        }

        return result.join(' ');
    }
}

const cn = createCn('handy-range-slider');

const HandyRangeSlider = (props: Props) => {
    const getThumbCorrection = (value: number) => {
        const valuePercent = getValueAsPercent(value);
        return THUMB_SIZE / 100 * valuePercent;
    }

    const getLabelCorrection = (value: number) => {
        const valuePercent = getValueAsPercent(value);
        return THUMB_SIZE * ((50 - valuePercent) / 100);
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

    const handleChange = (event: React.ChangeEvent) => {
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const handleLabelClick = (event: React.MouseEvent) => {
        if (props.onChange) {
            props.onChange(event);
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
                                onClick={(event) => handleLabelClick(event)}
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

    return (
        <div className={cn()}>
            <div className={cn('controls')}>
                <div
                    className={cn('track', {disabled: Boolean(props.disabled)})}
                    style={{
                        width: `calc(${valuePercent}% + ${THUMB_SIZE - thumbCorrection}px)`
                    }}
                >
                    {
                        props.showGrid &&
                        <div className={cn('grid')}>
                            {renderGridLines()}
                        </div>
                    }
                    <span
                        className={cn('thumb', {disabled: Boolean(props.disabled)})}
                        style={{
                            left: `${valuePercent}%`,
                            transform: `translate(-${thumbCorrection}px)`
                        }}
                    />
                </div>
            </div>
            <input
                className={cn('control')}
                type="range"
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
