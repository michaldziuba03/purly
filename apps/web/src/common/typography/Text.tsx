import React from 'react';

interface ITextProps extends React.PropsWithChildren {
    className?: string;
}

export const Text: React.FC<ITextProps> = (props) => {
    return (
        <span className={props.className}>{ props.children }</span>
    )
}
