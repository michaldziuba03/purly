import React from 'react';
import classNames from "classnames";

interface IButtonProps extends React.PropsWithChildren {
    outline?: boolean;
    full?: boolean; // useful for auth forms
}

export const Button: React.FC<IButtonProps> = (props) => {
    const styles = classNames(
        'flex items-center justify-center border border-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2',
        'hover:bg-gray-800 hover:border-gray-800 transition-colors',
        {
            'bg-black text-white': !props.outline,
            'text-black hover:text-white': props.outline,
            'w-full': props.full,
        }
    )

    return (
        <button
            type="button"
            className={styles}
        >
            { props.children }
        </button>
    );
}
