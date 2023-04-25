import {PriceCard} from "@/components/PriceCard";

export const PricingTable = () => {
    return  (
        <div className='w-full grid gap-8 py-8 grid-cols-1 lg:grid-cols-3'>
            <PriceCard
                price='$0'
                name="Free"
                description='Free plan for all users.'
                action='Get Started'
            />
            <PriceCard
                price='$5'
                name="Basic"
                description='Plan for individual creators and small teams.'
                action='Get Started'
            />
            <PriceCard
                price='-'
                name="Enterprise"
                description='Plan for larger business.'
                action='Contact Sales'
            />
        </div>
    )
}