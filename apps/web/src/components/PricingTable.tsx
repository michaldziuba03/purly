import {PriceCard} from "@/components/PriceCard";

export const PricingTable = () => {
    return  (
        <div className='w-full lg:max-w-5xl max-w-md grid gap-10 py-12 grid-cols-1 lg:grid-cols-3'>
            <PriceCard
                price='$0'
                name="Free"
                description='Free plan for all users.'
                action='Create account'
            />
            <PriceCard
                price='$5'
                name="Basic"
                description='Plan for individual creators and small teams.'
                action='Get Started'
                highlight
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