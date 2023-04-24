import React from "react";
import classNames from "classnames";

interface ILeadingProps extends React.PropsWithChildren {
    className?: string;
}

export const Leading: React.FC<ILeadingProps> = (props) => {
    const styles = classNames('text-lg text-slate-600', props.className)

    return (
        <p className={styles}>{ props.children }</p>
    )
}
