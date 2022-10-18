import React, {useState} from 'react';
import {HandyRangeSlider} from '@handy-ones/handy-range-slider';

export default {
    title: 'Handy range slider'
}

export const Basic = () => {
    const [value, setValue] = useState(60);
    const handleChange = (event: React.SyntheticEvent, value: number) => {
        setValue(Number(value));
    }

    return (
        <>
            <HandyRangeSlider
                min={50}
                max={100}
                step={2}
                value={value}
                onChange={handleChange}
            />
            <h3>Value: {value}</h3>
        </>
    );
};

export const Disabled = () => {
    const value = 77;

    return (
        <>
            <HandyRangeSlider
                min={50}
                max={100}
                value={value}
                step={2}
                disabled={true}
            />
            <h3>Value: {value}</h3>
        </>
    );
};

export const DefaultLabels = () => {
    const [value, setValue] = useState(60);
    const handleChange = (event: React.SyntheticEvent, value: number) => {
        setValue(Number(value));
    }

    return (
        <>
            <HandyRangeSlider
                min={50}
                max={100}
                value={value}
                onChange={handleChange}
                labels={[
                    {value: 50},
                    {value: 60},
                    {value: 70},
                    {value: 80},
                    {value: 88},
                    {value: 90},
                    {value: 100}
                ]}
            />
            <h3>Value: {value}</h3>
        </>
    );
};

export const Stylized = () => {
    const [value, setValue] = useState(60);
    const handleChange = (event: React.SyntheticEvent, value: number) => {
        setValue(Number(value));
    }
    const style = `
        .colored .handy-range-slider__track {
            background-color: #ffe53b;
            background-image: linear-gradient(90deg, #ffe53b 0%, #ff2525 74%);
        }
    `

    return (
        <>
            <style>{style}</style>
            <HandyRangeSlider
                className={'colored'}
                min={50}
                max={100}
                value={value}
                onChange={handleChange}
                labels={[
                    {value: 50, text: '😔'},
                    {value: 62.5, text: '😊'},
                    {value: 75, text: '😃'},
                    {value: 87.5, text: '😍'},
                    {value: 100, text: '❤️'}
                ]}

            />
            <h3>Value: {value}</h3>
        </>
    );
};
