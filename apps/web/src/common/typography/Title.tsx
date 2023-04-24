import React from "react";
import classNames from "classnames";

type HeadingLevel = 1 | 2 | 3 | 4;

interface IHeadingProps extends React.BaseHTMLAttributes<HTMLHeadingElement> {
    size: HeadingLevel;
}

const Heading: React.FC<IHeadingProps> = ({ size, children, ...props }) => {
    return React.createElement(`h${size}`, props, children);
}

interface ITitleProps extends React.PropsWithChildren {
    size?: HeadingLevel;
    className?: string;
}

export const Title: React.FC<ITitleProps> = (props) => {
    const { size = 1 , children } = props;
    const style = classNames(
        props.className,
        'font-extrabold text-black',
        {
            'text-4xl lg:text-6xl': size === 1,
            'text-2xl lg:text-3xl': size === 2,
            'text-xl lg:text-2xl': size === 3,
            'text-lg lg:text-xl': size === 4,
        }
    );

    return <Heading className={style} size={size}>{children}</Heading>
}