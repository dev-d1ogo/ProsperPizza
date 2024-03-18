import { Minus, Plus, ShoppingBasket, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { FormEvent, FormEventHandler, useContext, useEffect, useState } from 'react'
import { CartContenxt, CartContextData, CartProps } from '@/context/CartContext'
import Link from 'next/link'
import { priceFormatter } from '@/utils/priceFormatter'
import { useRouter } from 'next/router'


export const OrderCart = () => {
    const {
        cart,
        addNewProductToCart,
        removeProductToCart,
        cartAmount,
        totalCart,
        deleteProduct,
    } = useContext(CartContenxt)

    

    const [carrinho, setCarrinho] = useState<CartProps[]>([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Atualizar a quantidade do carrinho com base nos dados do contexto
            if (cart && cartAmount > 0) {
                cart ? setCarrinho(cart) : setCarrinho([])
            }
        }
    }, [cart])

    return (
        <div className="lg:max-w-[550px] w-full flex md:p-8 p-2 flex-col gap-3">
            <h1 className="text-xl font-bold mb-4">Pizzas selecionadas</h1>
            {cart.length === 0 && (
                <div className="w-full bg-muted/50 rounded-md md:p-8 p-2 h-[400px] flex  flex-col items-center justify-center gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-primary font-bold text-2xl">
                            Carrinho vazio
                        </h1>
                        <ShoppingBasket className="text-primary" size={25} />
                    </div>

                    <Link href={'/'}>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Aparentemente seu carrinho está vazio!
                        </p>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Confira nossos itens no menu principal{' '}
                            <span className="underline underline-offset-2 text-red-600">
                                clicando aqui
                            </span>
                        </p>
                    </Link>
                </div>
            )}

            {carrinho && cart.length !== 0 && (
                <div className="w-full bg-muted/50 rounded-md md:p-8 p-2 ">
                    {cart.map((produto) => {
                        return (
                            <div
                                key={produto.id}
                                className="border-b-2 flex flex-col sm:flex-row w-full gap-3 p-6 justify-center"
                            >
                                <img
                                    src={produto.imageURL}
                                    alt=""
                                    className="lg:w-[120px] lg:h-[120px] sm:w-[240px] sm:h-[240px] w-[200px] h-[200px] mx-auto"
                                />
                                <div className="py-5 px-3 w-full flex flex-col gap-3 ">
                                    <div className='flex items-center justify-between'>
                                        <h1>{produto.title}</h1>
                                        <p className='font-bold text-sm leading-6'>{priceFormatter.format(produto.price)}</p>
                                        
                                    </div>
                                    <div className="flex gap-3 justify-between">
                                        <div className="bg-muted flex p-2 rounded-lg items-center gap-3 w-[100px] justify-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    produto.amount > 1 ? removeProductToCart(produto) : deleteProduct(produto)
                                                    
                                                }
                                            >
                                                <Minus color="red" size={18} />
                                            </button>

                                            <span className="w-4 text-center">
                                                {produto.amount}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addNewProductToCart(produto)
                                                }
                                            >
                                                <Plus color="red" size={18} />
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            className="bg-muted flex p-2 rounded-lg items-center gap-3 hover:border-red-600 hover:border-2"
                                        >
                                            <Trash2 color="red" size={18} />
                                            <button type='button' className="text-sm font" onClick={() => deleteProduct(produto)}>
                                                REMOVER
                                            </button>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div className="mt-8 flex flex-col gap-4">
                        <span className="flex items-center justify-between">
                            <p className="font-light">Total de itens</p>
                            <p className="font-normal">{priceFormatter.format(totalCart)}</p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="font-light">Entrega</p>
                            <p className="font-normal">R$3,50</p>
                        </span>
                        <span className="flex items-center justify-between">
                            <p className="font-bold text-xl text-primary ">
                                Total
                            </p>
                            <p className="font-bold text-xl text-primary ">
                                {priceFormatter.format(totalCart + 3.50) }
                            </p>
                        </span>

                        <Button type='submit' className="border-2 hover:border-red-500/75">
                            Confirmar pedido{' '}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
