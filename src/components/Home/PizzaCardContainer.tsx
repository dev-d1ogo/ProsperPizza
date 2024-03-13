import { ShoppingCart } from "lucide-react"
import { Button } from "../ui/button"
import { PizzaCard } from "./PizzaCard"

const PizzaCardContainer = () => {
    return (
        <div className="w-full h-full mt-6">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-4xl font-bold text-start tracking-wide">
                    Escolha sua pizza
                </h1>
                <h2 className="text-5xl text-center font-light">
                    Nossos principais sabores
                </h2>
            </div>

            <div className="md:grid md:grid-cols-2 mt-[80px] gap-10">
                <PizzaCard/>
                <PizzaCard/>
            </div>
        </div>
    )
}

export default PizzaCardContainer
