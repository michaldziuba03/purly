import React from "react";
import { Title } from "@/common/typography/Title";
import { GradientText } from "@/common/typography/GradientText";
import { Leading } from "@/common/typography/Leading";
import { Button } from "@/common/buttons/Button";
import { Container } from "@/common/container/Container";
import {MouseIcon} from "@/common/icons/Mouse";

export const Hero: React.FC = () => {
    return (
        <Container>
            <div className='flex flex-col items-center mx-auto max-w-4xl py-8 lg:py-16'>
                <Title className='text-center'>Increase and track your network with
                    <GradientText> Open Source</GradientText>.
                </Title>
                <Leading className='text-center mt-5 max-w-3xl'>XXX is an open-source project to help you share and track your links. Shorten URLs. Generate QR Codes. Track traffic.</Leading>
                <div className='flex gap-4 mt-8'>
                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Get Started for Free
                    </Button>
                    <div className='hidden lg:block'>
                        <Button type='outline'>Get Demo</Button>
                    </div>
                </div>

                <div className='mt-16 flex flex-col items-center gap-4'>
                    <div className='animate-bounce'>
                        <MouseIcon />
                    </div>

                    <svg width="16" height="90" viewBox="0 0 8 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.64644 80.3536C3.84171 80.5488 4.15829 80.5488 4.35355 80.3536L7.53553 77.1716C7.73079 76.9763 7.73079 76.6597 7.53553 76.4645C7.34027 76.2692 7.02369 76.2692 6.82842 76.4645L4 79.2929L1.17157 76.4645C0.976307 76.2692 0.659725 76.2692 0.464463 76.4645C0.269201 76.6597 0.269201 76.9763 0.464463 77.1716L3.64644 80.3536ZM3.5 -2.18557e-08L3.5 80L4.5 80L4.5 2.18557e-08L3.5 -2.18557e-08Z" fill="black"/>
                    </svg>

                </div>
            </div>
        </Container>
    )
}