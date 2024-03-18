import { OrderAddress } from "./orderAddress"
import { OrderPayment } from "./orderPayment"

export const OrderDetails = () => {
    return (
        <div className="w-full  min-w-[400px] flex md:p-8 p-2 flex-col gap-3">
            <OrderAddress/>
            <OrderPayment/>
        </div>
    )
}
