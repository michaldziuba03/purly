import React from "react";
import {Text} from "@/common/typography/Text";
import {Button} from "@/common/buttons/Button";

interface IPriceCardProps {
    name: string;
    price: string;
    description: string;
    action: string;
}

export const PriceCard: React.FC<IPriceCardProps> = (props) => {
    return  (
        <div className='shadow-lg shadow-purple-200/80 border flex flex-col gap-16 justify-between px-8 py-10 rounded-xl'>
            <div className='flex flex-col'>
                <span className='text-black text-lg font-semibold'>{ props.name }</span>
                <span className='mt-4 font-black text-5xl text-black'>
                    { props.price }
                </span>

                <Text className='mt-8'>{ props.description }</Text>
                <ul className='mt-16'>
                    <li>1k clicks</li>
                    <li>1k clicks</li>
                    <li>1k clicks</li>
                </ul>
            </div>

            <Button full>{ props.action }</Button>
        </div>
    );
}