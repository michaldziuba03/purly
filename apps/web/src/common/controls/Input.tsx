import React from "react";

interface InputProps {
    name?: string;
}

export const Input: React.FC<InputProps> = (props) => {
    return (
        <input
            className='w-full placeholder-gray-400 px-3 py-2 h-10 border border-gray-300 text-black rounded-lg shadow-sm focus:border-black focus:outline-none focus:ring-black'
            name={props.name}
            id={props.name}
        />
    )
}
