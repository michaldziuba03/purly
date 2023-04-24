import React from 'react';

interface IContainerProps extends React.PropsWithChildren {}

export const Container: React.FC<IContainerProps> = (props) => {
    return (
        <div className='container mx-auto py-2 px-6 lg:px-40'>{ props.children }</div>
    )
}
