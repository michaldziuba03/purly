import React from "react";

interface ILabelProps extends React.PropsWithChildren {
    text: string;
    for: string;
}

export const Label: React.FC<ILabelProps> = (props) => {
    return (
        <label
            className='text-xs font-medium md:text-sm'
            htmlFor={props.for}>
            { props.text }
        </label>
    )
}