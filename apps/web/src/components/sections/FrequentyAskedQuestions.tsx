import React from 'react';
import {Container} from "@/common/container/Container";
import {Title} from "@/common/typography/Title";
import {Faq, FAQ} from "@/components/FAQ";
import {Leading} from "@/common/typography/Leading";
import {projectName} from "@/vars";

const faq: Faq[] = [
    {
        question: 'What is URL shortener?',
        answer: 'A URL shortener, also known as a link shortener, seems like a simple tool, but it is a service that can have a dramatic impact on your marketing efforts.'
    },
    {
        question: 'Do you offer technical support?',
        answer: 'We offer advanced technical support only for our enterprise customers. If you have found bug you can create issue on GitHub.'
    },
    {
        question: `Why ${projectName}?`,
        answer: 'Because we offer good pricing and reliability as open source software.'
    }
]

export const FrequentlyAskedQuestion: React.FC = () => {
    return (
        <Container>
            <div className='flex py-8 flex-col items-center mx-auto'>
                <Title size={2}>FAQ</Title>
                <Leading className='mt-2 max-w-3xl text-center'>Frequently asked questions</Leading>
            </div>
            <FAQ faqList={faq} />
        </Container>
    )
}