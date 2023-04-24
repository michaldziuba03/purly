import React from "react";

interface ILeadingProps extends React.PropsWithChildren {}

export const Leading: React.FC<ILeadingProps> = (props) => {
    return (
        <p className='font-medium text-xl text-gray-800'>{ props.children }</p>
    )
}
