import React from "react";
import { Title } from "@/common/typography/Title";
import { GradientText } from "@/common/typography/GradientText";
import { Leading } from "@/common/typography/Leading";
import { Button } from "@/common/buttons/Button";
import { Container } from "@/common/container/Container";

export const Hero: React.FC = () => {
    return (
        <Container>
            <div className='flex flex-col items-center mx-auto max-w-3xl py-14'>
                <Title className='text-center'>Increase and track your network with
                    <GradientText> Open Source</GradientText>.
                </Title>
                <Leading className='text-center mt-5'>XXX is an open-source project to help you share and track your links. Shorten URLs. Generate QR Codes. Track traffic.</Leading>
                <div className='flex gap-2 mt-8'>
                    <Button>Get Started for Free</Button>
                    <Button outline>Get Demo</Button>
                </div>
            </div>
        </Container>
    )
}