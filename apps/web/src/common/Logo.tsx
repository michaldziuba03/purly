import React from "react";
import {projectName} from "@/vars";

export const Logo: React.FC = () => {
    return (<h1 className='font-extrabold text-lg select-none text-black'>
        { projectName }
    </h1>);
}
