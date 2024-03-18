import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { CartContenxt } from '@/context/CartContext'
import { useProduct } from '@/context/ProductContext'
import Image from 'next/image'
import { priceFormatter } from '@/utils/priceFormatter'

export const PizzaCard = () => {
    const { addNewProductToCart } = useContext(CartContenxt)

    const { produtos } = useProduct()

    return (
        <>
            {produtos &&
                produtos.map((produto) => {
                    return (
                        <div
                            key={produto.id}
                            className="card w-full h-full p-6 flex justify-center cur "
                        >
                            <div className="w-[350px] h-[500px]  flex  flex-col items-center gap-3 p-4 relative">
                                <div className="w-[238px] h-[246px]">
                                    <span className="w-[250px] h-[125px] absolute top-[90px] left-[130px] transform -translate-x-1/2 -translate-y-1/2 h-100 w-200 bg-red-500  rounded-full rounded-b-none -rotate-45 -z-10"></span>
                                    <Image
                                        src={produto.imageURL}
                                        alt=""
                                        className="z-10 cursor-pointer"
                                        width={238}
                                        height={246}
                                    />
                                </div>

                                <h1 className="text-2xl font-bold text-pretty ">
                                    {produto.title}
                                </h1>

                                <p className="text-center text-lg font-light">
                                    {produto.description}
                                </p>

                                <span className="font-bold text-xl">
                                    {priceFormatter.format(
                                        Number(produto.price)
                                    )}
                                </span>

                                <Button
                                    className="flex gap-3"
                                    onClick={() => {
                                        const newProduct = {...produto, amount: 1, total: produto.price}
                                        addNewProductToCart(newProduct)
                                    }}
                                >
                                    <p className="font-bold text-sm">
                                        Compre agora
                                    </p>
                                    <ShoppingCart size={18} />
                                </Button>
                            </div>
                        </div>
                    )
                })}
        </>
    )
}
