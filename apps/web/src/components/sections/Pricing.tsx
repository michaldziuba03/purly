import React from "react";
import {Container} from "@/common/container/Container";
import {Title} from "@/common/typography/Title";
import {PricingTable} from "@/components/PricingTable";
import {Leading} from "@/common/typography/Leading";

export const Pricing: React.FC = () => {
    return (
        <Container>
            <div className='flex flex-col items-center mx-auto py-8 lg:py-16'>
                <Title size={2}>Pricing</Title>
                <Leading className='mt-2 max-w-3xl text-center'>
                    We offer stable and transparent pricing.
                </Leading>

                <PricingTable />
            </div>
        </Container>
    )
}