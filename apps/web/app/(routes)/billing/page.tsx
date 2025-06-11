import { PricingTable } from "@clerk/nextjs"

function Billing(){
    return (
        <div>
            <h1 className="font-bold text-3xl text-center">Choose Your Plan</h1>
            <p className="text-lg text-center mb-7">Select a subscription bundle to access unlimited access to Ai Tools</p>
            <PricingTable />
        </div>
    )
}

export default Billing;