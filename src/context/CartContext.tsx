import { ProductsProps } from "@/pages";
import { it } from "node:test";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface CartProps extends ProductsProps{
    amount: number,
    total: number
}

export interface CartContextData{
    cart: CartProps[],
    cartAmount: number,
    totalCart: number, 

    addNewProductToCart: (newItem:CartProps) => void,
    removeProductToCart: (itemToRemove:CartProps) => void,
    deleteProduct: (productToDelete:CartProps) => void,
    clearCart: () => void
}

// Criando o contexto para o nosso carrinho

export const CartContenxt = createContext({} as CartContextData)

interface ChildrenProps{
    children: ReactNode
}

// Criando nosso provider

export const CartProvider = ({children}:ChildrenProps) => {
    const [cart, setCart] = useState<CartProps[]>(() => {
        if(typeof window !== 'undefined'){
            const cartStorageJSON = localStorage.getItem('@prosper-pizza:cart')
            if(cartStorageJSON !== null){
                try {
                    const cartItems = JSON.parse(cartStorageJSON)
                    return cartItems
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return[]
    })

    const [totalCart, setTotalCart] = useState(() => {
        if(typeof window !== 'undefined'){
            const totalInStorageJSON  = localStorage.getItem('@prosper-pizza:cart')
            if(totalInStorageJSON !== null){
                try {
                    const totalInStorage = JSON.parse(totalInStorageJSON)
                    return totalInStorage
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return 0
    })

    // Adicionando um produto ao carrinho

    const addNewProductToCart = (newItem:CartProps) => {
        const itemAlreadyInserted = cart?.findIndex(item => item.id === newItem.id)

        // Item ja foi inserido?
        if(itemAlreadyInserted !== -1){
            let cartList = cart

            const itemForInsert = cartList[itemAlreadyInserted]

            // Adicionando mais um produto do msm modificando apenas a quantidade e o valor total
            itemForInsert.amount = itemForInsert.amount + 1
            itemForInsert.total = itemForInsert.price * itemForInsert.amount

            setCart(cartList)
            calculateTotalInCart(cartList)
            toast.success(`Mais uma pizza ${newItem.title} foi adicionado ao carrinho 🍕`)

            return
        }

        // Insercao padrao

        setCart(state => [...state, newItem])
        calculateTotalInCart([...cart, newItem])
        toast.success(`Uma pizza ${newItem.title} foi adicionado ao carrinho 🍕`)
    }

    // Removendo um produto do carrinho

    const removeProductToCart = (productToRemove:CartProps) => {
        const itemAlreadyInCart = cart?.findIndex(
            (item) => item.id === productToRemove.id
        )
        const itemToRemove = cart[itemAlreadyInCart]

        // O produto ja esta no carrinho e a quantidade dele é maior do que 1?

        if (itemToRemove.amount > 1) {
            // Removendo um da quantidade e alterando o total dele removendo o preco de um produto
            itemToRemove.amount = itemToRemove.amount - 1
            itemToRemove.total = itemToRemove.total - itemToRemove.price

            setCart((state) => [...state])

            toast.error(`Uma pizza ${productToRemove.title} foi removida 🍕. Tem certeza? essa é uma delícia!  `)
        }
        calculateTotalInCart(cart)
        //Caso a quantidade dele seja somente 1 irei excluir o item do carrinho
    }

    
    // Deletando um produto do carrinho
    const deleteProduct= (productToDelete:CartProps) => {
        const listSemItem = cart.filter((produto) => produto.id !== productToDelete.id)
        setCart(listSemItem)
        calculateTotalInCart(listSemItem)

        toast.error(`Uma pizza ${productToDelete.title} foi removida do carrinho 🍕.`)
        
    }
    // Pegando o total do carrinho

    const calculateTotalInCart = (cart:CartProps[]) => {
        let myCart = cart
        const totalInCart = myCart.reduce((acc, product) => {
            acc += product.total
            return acc
        }, 0)

        setTotalCart(totalInCart)
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem('@prosper-pizza:total')
    }
    // Salvando o carrinho no localStorage

    useEffect(()=>{
        const cartStateJSON = JSON.stringify(cart)
        const totalStorage = cart.reduce((acc, produto) => {
            acc += produto.total
            return acc 
        }, 0)


        localStorage.setItem('@prosper-pizza:cart', cartStateJSON)
        localStorage.setItem('@prosper-pizza:total', JSON.stringify(totalStorage))
    },[cart])

    

    return(
        <CartContenxt.Provider value={{addNewProductToCart, removeProductToCart, cart, cartAmount: cart.length, totalCart, deleteProduct, clearCart}}>
            {children}
        </CartContenxt.Provider>
    )
}