import {HandyClamp, HandyClampProps} from '@handy-ones/handy-clamp';
import type {Story} from '@ladle/react';

export default {
    title: 'Handy clamp'
}

const text = `This book is largely concerned with Hobbits, and from its pages a reader may discover
much of their character and a little of their history. Further information will also be found in
the selection from the Red Book of Westmarch that has already been published, under the title of The Hobbit.
That story was derived from the earlier chapters of the Red Book, composed by Bilbo himself,
the first Hobbit to become famous in the world at large, and called by him There and Back Again,
since they told of his journey into the East and his return: an adventure
which later involved all the Hobbits in the great events of that Age that are here related.`

export const Basic = () => (
    <HandyClamp lines={2}>
        {text}
    </HandyClamp>
);

export const HiddenExpandControl = () => (
    <HandyClamp lines={2} expandControl={null}>
        {text}
    </HandyClamp>
);

export const CustomExpandControl = () => (
    <HandyClamp lines={2} expandControl={<a href='#'>Expand</a>}>
        {text}
    </HandyClamp>
);

export const Interactive: Story<HandyClampProps> = (props) => (
    <HandyClamp
        lines={props.lines}
        expandControl={
            <span dangerouslySetInnerHTML={{__html: props.expandControl as unknown as string}} />
        }
    >
        {props.children}
    </HandyClamp>
);

Interactive.args = {
    children: text,
    expandControl: '<button>Expand</button>',
    lines: 2,
};
