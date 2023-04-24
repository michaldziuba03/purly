import React from 'react';

interface IContainerProps extends React.PropsWithChildren {}

export const Container: React.FC<IContainerProps> = (props) => {
    return (
        <div className='container'>{ props.children }</div>
    )
}
