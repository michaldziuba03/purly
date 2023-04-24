import React from 'react';

export const GradientText: React.FC<React.PropsWithChildren> = (props) => {
    return <span className='text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500'>{props.children}</span>
}
