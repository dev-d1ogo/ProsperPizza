import { Banknote, CreditCard, DollarSign, Landmark } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

export const OrderPayment = () => {
    return (
        <div className="w-full bg-muted/50 rounded-md md:p-8 p-2 gap-3 flex flex-col">
            <div className="flex gap-3 items-center ">
                <DollarSign color="red" />
                <h1 className="leading-8">
                    Pagamento
                    <p className="font-light text-sm">
                        O pagamento é feito na entrega. Escolha a forma que
                        deseja pagar
                    </p>
                </h1>
            </div>
            
            <RadioGroup className="flex gap-3 items-center w-full" defaultValue="credit"  onValueChange={value => console.log(value)} required>
                <RadioGroupItem value="credit" asChild>
                    <button className="data-[state='checked']:bg-red-500/15 data-[state='checked']:border-red-600 data-[state='checked']:border-2">
                        <CreditCard color="red" size={18}/>
                        <p className="text-sm leading-3 text-muted-foreground px-2">CRÉDITO</p>
                    </button>
                </RadioGroupItem>
                <RadioGroupItem value="debit" asChild>
                    <button className="data-[state='checked']:bg-red-500/15 data-[state='checked']:border-red-600 data-[state='checked']:border-2">
                        <Landmark color="red" size={18}/>
                        <p className="text-sm leading-3 text-muted-foreground px-2">DÉBITO</p>
                    </button>
                </RadioGroupItem>
                <RadioGroupItem value="money" asChild>
                    <button className="data-[state='checked']:bg-red-500/15 data-[state='checked']:border-red-600 data-[state='checked']:border-2">
                        <Banknote color="red" size={18}/>
                        <p className="text-sm leading-3 text-muted-foreground px-2">DINHEIRO</p>
                    </button>
                </RadioGroupItem>
            </RadioGroup>
        </div>
    )
}