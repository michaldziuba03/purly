import React from 'react';
import classNames from "classnames";

interface IButtonProps extends React.PropsWithChildren {
    outline?: boolean;
    full?: boolean; // useful for auth forms
}

export const Button: React.FC<IButtonProps> = (props) => {
    const styles = classNames(
        'flex items-center justify-center border border-black font-medium rounded-lg text-sm h-12 px-6 py-2.5 mr-2 mb-2',
        'hover:bg-gray-700 hover:border-gray-700 transition-colors',
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
