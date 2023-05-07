import React from "react";
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {Title} from "@/common/typography/Title";
import classNames from "classnames";

interface DisclosureTitleProps {
    open: boolean;
    title: string;
}
const DisclosureTitle: React.FC<DisclosureTitleProps> = ({ open, title }) => {
    const styles = classNames('flex text-left rounded-md text-black items-center w-full py-6 px-2 md:px-8 hover:bg-gray-200 transition-colors delay-50', {
        'bg-gray-200': open,
    });

    return (
        <Disclosure.Button className={styles}>
            <ChevronRightIcon className={open ? 'rotate-90 transition-transform transform h-8 w-8' : 'h-8 w-8'} />
            <h5 className='ml-2 text-md md:text-lg font-extrabold'>{ title }</h5>
        </Disclosure.Button>
    )
}

interface DisclosurePanelProps {
    text: string;
}

const DisclosurePanel: React.FC<DisclosurePanelProps> = ({ text }) => {
    return (
        <Disclosure.Panel className='py-8 md:px-16 px-10'>
            <span className='px-2 text-sm md:text-base'>{ text }</span>
        </Disclosure.Panel>
    )
}

export interface Faq {
    question: string;
    answer: string;
}

interface FaqProps {
    faqList: Faq[]
}

export const FAQ: React.FC<FaqProps> = ({ faqList }) => {
    return (
        <div>
            { faqList.map(faq => (
                <Disclosure key={faq.question}>
                    { ({ open }) => (
                        <>
                            <DisclosureTitle title={faq.question} open={open} />
                            <DisclosurePanel text={faq.answer} />
                            <hr className="border-gray-200 mx-auto"/>
                        </>
                    )}
                </Disclosure>
            )) }
        </div>
    )
}