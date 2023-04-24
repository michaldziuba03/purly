import React from 'react';

interface ITextProps extends React.PropsWithChildren {}

export const Text: React.FC<ITextProps> = (props) => {
    return (
        <span className='text-gray-900'>{ props.children }</span>
    )
}
