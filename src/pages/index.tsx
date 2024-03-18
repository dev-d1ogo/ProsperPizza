import PizzaCardContainer from '@/components/Home/PizzaCardContainer'
import PizzaTitle from '@/components/Home/PizzaContainer'

import AppLayout from '@/components/layouts/appLayout'
import { useProduct } from '@/context/ProductContext'
import { useUser } from '@/context/UserContext'
import api from '@/lib/axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface ProductsProps {
    id: number
    title: string
    description: string
    imageURL: string
    price: number
}

interface ProdutosResponse {
    products: ProductsProps[]
}

export default function Home({ products }: ProdutosResponse) {
    const { addProduct } = useProduct()
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace('/auth/signIn')
        }
        addProduct(products)
    }, [user])

    return (
        <>
          <Head>
            <title>Home 🍕</title>
          </Head>
          <AppLayout>
              <div className="max-w-[1070px] mx-auto h-screen">
                  <PizzaTitle />
                  <PizzaCardContainer />
              </div>
          </AppLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get('/pizza')
    console.log(response.data)
    return {
        props: {
            products: response.data,
        },
    }
}
