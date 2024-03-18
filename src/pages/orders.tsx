import { OrderCart } from "@/components/Orders/orderCart"
import { OrderDetails } from "@/components/Orders/orderDetails"
import AppLayout from "@/components/layouts/appLayout"
import { CartContenxt } from "@/context/CartContext"
import Head from "next/head"
import { useRouter } from "next/router"
import { FormEvent, useContext } from "react"

const Orders = () => {
    const {clearCart} = useContext(CartContenxt)
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        clearCart()
        window.location.replace('/send')
    }
    return (
        <> 
            <Head>
                <title>Meu carrinho</title>
            </Head>
            <AppLayout>
                <form action="" onSubmit={handleSubmit}>
                    <div className="lg:grid lg:grid-cols-2 lg:max-w-[1300px] lg:w-[1280px] flex justify-center flex-col mx-auto mt-8">
                        <OrderDetails />
                        <OrderCart />
                    </div>
                </form>
            </AppLayout>
        </>
    )
}

export default Orders