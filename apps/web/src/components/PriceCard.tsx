import React from "react";
import {Text} from "@/common/typography/Text";
import {Button} from "@/common/controls/Button";
import classNames from "classnames";

interface IPriceCardProps {
    name: string;
    price: string;
    description: string;
    action: string;
    highlight?: boolean;
}

export const TierFeature = () => {
    return (
        <div className='flex items-center gap-3 py-2'>
            <div className='text-green-600'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
            </div>

            <span className='text-slate-800'>1k clicks</span>
        </div>

    )
}

export const PriceCard: React.FC<IPriceCardProps> = (props) => {
    const style = classNames(
        'relative shadow-md lg:shadow-lg bg-white border flex flex-col gap-16 justify-between px-8 py-10 rounded-xl',
        {
            'border-purple-600 border-2 shadow-purple-200 lg:shadow-purple-200': props.highlight,
        }
    );

    return  (
        <div className={style}>
            { props.highlight && (
                <div className='absolute bg-gradient-to-br from-purple-600 to-blue-500 rounded-3xl text-white -translate-y-1/2 -translate-x-1/2 text-xs font-semibold left-1/2 top-0 py-3 px-8'>Popular</div>
            ) }
            <div className='flex flex-col'>
                <span className='text-black text-lg font-semibold'>{ props.name }</span>
                <span className='flex gap-3 items-end'>
                    <span className='mt-4 font-black text-5xl text-black'>
                        { props.price }
                    </span>
                    <span className='text-sm'>per month</span>
                </span>


                <Text className='mt-8'>{ props.description }</Text>
                <ul className='mt-16'>
                    <TierFeature />
                    <TierFeature />
                    <TierFeature />
                </ul>
            </div>

            <Button type={
                props.highlight ? 'gradient' : 'primary'
            } full>{ props.action }</Button>
        </div>
    );
}
