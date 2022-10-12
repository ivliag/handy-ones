import {HandySvg, injector} from '@handy-ones/handy-svg';
import {useEffect, useRef} from 'react';

export default {
    title: 'Handy SVG'
}

const icons = [
    'https://www.reshot.com/preview-assets/icons/CEMWASR2NL/children-playground-CEMWASR2NL.svg',
    'https://www.reshot.com/preview-assets/icons/G9ADMFHEUT/men-dancing-G9ADMFHEUT.svg',
    'https://www.reshot.com/preview-assets/icons/BP5D68RNY2/human-and-dog-BP5D68RNY2.svg',
];

export const Basic = () => {
    return (
        icons.map((icon) => (
            <div key={icon}>
                <HandySvg src={icon} />
            </div>
        ))
    );
};

export const Colored = () => {
    const colors = ['MidnightBlue', 'RebeccaPurple', 'CornflowerBlue']

    return (
        icons.map((icon, index) => (
            <div key={icon}>
                <HandySvg src={icon} style={{fill: colors[index]}} />
            </div>
        ))
    );
};

export const WithoutReact = () => {
    const rootRef = useRef<HTMLSpanElement>(null);
    const iconURL = 'https://www.reshot.com/preview-assets/icons/WCG9LBYKDZ/man-and-tree-WCG9LBYKDZ.svg';

    useEffect(() => {
        // Fetches svg content and puts it to sprite
        injector.load(iconURL).catch(() => ({}));

        // Gets the id of your svg in sprite
        const id = injector.getId(iconURL);

        // Use it as you want
        const svg = `<svg><use href="#${id}" /></svg>`

        if (rootRef.current) {
            rootRef.current.innerHTML = svg;
        }
    }, []);

    return (
        <span
            style={{width: '200px', height: '200px'}}
            ref={rootRef}
        />
    )
};
