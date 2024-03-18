import { AddressProps } from '@/components/Orders/orderAddress'
import AppLayout from '@/components/layouts/appLayout'
import { Locate, MapPin, Timer } from 'lucide-react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface AddressComplete extends AddressProps{
    number: string,
    complement?: string
}

const SendPage = () => {
    const [address, setAddress] = useState<AddressComplete>({} as AddressComplete)

    const getAddress = () => {
        if (typeof window !== 'undefined') {
            const addressJSON = localStorage.getItem('@prosper-pizza:address')
            if (addressJSON !== null) {
                const endec = JSON.parse(addressJSON)
                return endec
            }
        }
        
        return {}
    }

    useEffect(() => {
        // Verificar se estamos no lado do cliente

        const endereco = getAddress()

        setAddress(endereco)
    }, [])

    
    return (
        <>  
            <Head>
                <title>Pedido concluído</title>
            </Head>
            <AppLayout>
                <div className="max-w-[1300px] mx-auto my-[80px] p-8 ">
                    <div className="mb-[30px] lg:text-start text-center">
                        <h1 className="text-2xl font-semibold text-red-700">
                            Uhu! Pedido confirmado
                        </h1>
                        <p className="font-light">
                            Agora é so aguardar que logo sua pizza chegará até
                            você
                        </p>
                        <p className=" text-sm leading-relaxed text-muted-foreground mt-3">
                            Volte para a página inicial{' '}
                            <Link
                                href="/"
                                className="underline underline-offset-2 text-red-600"
                                replace
                            >
                                clicando aqui
                            </Link>
                        </p>
                    </div>

                    <div className="lg:grid lg:grid-cols-2 flex flex-col gap-8 items-center justify-center">
                        <div className="flex flex-col p-10 border-2 border-red-600 max-w-[526px] rounded-tr-[50px] rounded-bl-[50px] gap-8 justify-center items-start">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-12 h-12 bg-red-500 flex justify-center items-center rounded-full">
                                    <MapPin color="white" />
                                </div>

                                <div className="leadin">
                                    <h1>
                                        Entrega em{' '}
                                        <strong>{address.logradouro}</strong>
                                    </h1>
                                    <p>
                                        {address.bairro} - {address.localidade},{' '}
                                        {address.uf}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-yellow-500 flex justify-center items-center rounded-full">
                                    <Timer color="white" />
                                </div>

                                <div>
                                    <h1>Previsão de entrega</h1>
                                    <strong>20 min - 30 min</strong>
                                </div>
                            </div>
                        </div>
                        <Image
                            src={'/images/prosperSend.png'}
                            width={500}
                            height={300}
                            alt=""
                        />
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

export default SendPage
