import React from 'react';
import classNames from "classnames";

interface IButtonProps extends React.PropsWithChildren {
    type?: 'primary' | 'outline' | 'gradient';
    full?: boolean; // useful for auth forms
}

export const Button: React.FC<IButtonProps> = (props) => {
    const { type = 'primary' } = props;

    const styles = classNames(
        'select-none flex items-center gap-2 justify-center border border-black font-medium rounded-lg text-sm h-12 px-6 py-2.5',
        'hover:bg-gray-700 hover:border-gray-700 transition-colors duration-400',
        {
            'bg-black text-white': type === 'primary',
            'text-black hover:text-white': type === 'outline',
            'text-white border-purple-600 hover:border-purple-600 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl': type === 'gradient',
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
