<img
    width="200"
    alt="handy range slider"
    src="https://raw.githubusercontent.com/ivliag/handy-ones/master/services/showcase/src/assets/handy-range-slider.png"
/>

Fully-customizable native range-slider for React. [Demo](https://ivliag.github.io/handy-ones/?story=handy-range-slider--stylized)

## Usage

#### Install it from npm
```
npm i @handy-ones/handy-range-slider
```

#### Use it just like `<input type="range">`
```typescript
import {HandyRangeSlider} from '@handy-ones/handy-range-slider';

export const FormWithRangeSlider = () => (
    <HandyRangeSlider
        min={50}
        max={100}
        step={2}
    />
)
```

#### Add labels. They are clickable!
```typescript
import {HandyRangeSlider} from '@handy-ones/handy-range-slider';

export const FormWithRangeSlider = () => (
    <HandyRangeSlider
        min={50}
        max={100}
        labels={[
            {value: 50, text: '😔'},
            {value: 62.5, text: '😊'},
            {value: 75, text: '😃'},
            {value: 87.5, text: '😍'},
            {value: 100, text: '❤️'}
        ]}
    />
)
```

#### Style with css
```typescript
import {HandyRangeSlider} from '@handy-ones/handy-range-slider';

export const FormWithRangeSlider = () => (
    <>
        <style>
            `.colored .handy-range-slider__track {
                background-color: #ffe53b;
            }`
        </style>
        <HandyRangeSlider
            className={'colored'}
            min={50}
            max={100}
        />
    </>
)
```

## Demo
Please click `</>` button to see the demo souce code:
1. [Basic usage](https://ivliag.github.io/handy-ones/?story=handy-range-slider--basic)
2. [With labels](https://ivliag.github.io/handy-ones/?story=handy-range-slider--default-labels)
3. [Stylized](https://ivliag.github.io/handy-ones/?story=handy-range-slider--stylized)

## API
#### `Props`
```typescript
interface HandyRangeSliderProps {
    className?: string; // additional css-class name
    min: number; // minimum value
    max: number; // maximum value
    value: number; // current value
    step?: number; // step between values
    showGrid?: boolean; // show grid on the slider
    gridStep?: number; // step between grid items
    labels?: Label[]; // lebels under slider
    disabled?: boolean;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>,
        value: number
    ) => void;
}
```

## License
[MIT](https://github.com/ivliag/handy-ones/blob/master/packages/handy-range-slider/LICENSE)
