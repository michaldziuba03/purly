import React from "react";
import {Container} from "@/common/container/Container";
import {Title} from "@/common/typography/Title";
import {Leading} from "@/common/typography/Leading";
import {FeatureCard} from "@/components/FeatureCard";
import {projectName} from "@/vars";

export const Features: React.FC = () => {
    return (
            <Container>
                <div className='flex flex-col items-center mx-auto py-8 lg:py-16'>
                    <Title size={2}>Features</Title>
                    <Leading className='mt-2 max-w-3xl text-center'>What actually makes { projectName } awesome?</Leading>

                    <div className='mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        <FeatureCard />
                        <FeatureCard />
                        <FeatureCard />
                        <FeatureCard />
                    </div>
                </div>
            </Container>
    )
}