import React, {useState} from 'react';
import {HandyRangeSlider} from '@handy-ones/handy-range-slider';

export default {
    title: "Handy range slider"
}

export const Basic = () => {
    const [value, setValue] = useState(60);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    }

    return (
        <HandyRangeSlider
            min={50}
            max={100}
            step={2}
            value={value}
            onChange={handleChange}
            labels={[
                {value: 50, text: 50},
                {value: 60, text: 60},
                {value: 70, text: 70},
                {value: 80, text: 80},
                {value: 88, text: 88},
                {value: 90, text: 90},
                {value: 100, text: 100}
            ]}
        />
    );
};
