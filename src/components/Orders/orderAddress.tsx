import { MapPin } from 'lucide-react'
import { Input } from '../ui/input'
import { useState } from 'react'
import api from '@/lib/axios'

export interface AddressProps {
    cep: string | undefined
    logradouro: string | undefined
    complemento: string | undefined
    bairro: string | undefined
    localidade: string | undefined
    uf: string | undefined
}

export const OrderAddress = () => {
    const [address, setAddress] = useState<AddressProps>({} as AddressProps)
    const [street, setStreet] = useState<string | undefined>('')
    const [district, setDistrict] = useState<string | undefined>()
    const [city, setCity] = useState<string | undefined>('')
    const [state, setState] = useState<string | undefined>()
    const [number, setNumber] = useState<string | undefined>()
    const [complement, setComplement] = useState<string | undefined>()
    const [cep, setCEP] = useState('')

    const handlePickCep = async (cep: string) => {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const addressJSON: AddressProps = await response.json()
        setAddress(addressJSON)

        if (addressJSON) {
            setStreet(addressJSON.logradouro)
            setCity(addressJSON.localidade)
            setDistrict(addressJSON.bairro)
            setState(addressJSON.uf)

            const addressComplete = {
                ...addressJSON,
                number,
                complement
            }

            localStorage.setItem('@prosper-pizza:address', JSON.stringify(addressComplete))
        }
    }

    return (
        <>
            <h1 className="text-xl font-bold mb-4">Complete seu pedido</h1>
            <div className="w-full bg-muted/50 rounded-md md:p-8 p-2 gap-3 flex flex-col">
                <div className="flex gap-3 items-center ">
                    <MapPin color="red" />
                    <h1 className="leading-8">
                        Endereço de entrega
                        <p className="font-light text-sm">
                            Informe o endereço onde deseja receber seu pedido
                        </p>
                    </h1>
                </div>

                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="CEP"
                        className="bg-muted"
                        onBlur={(e) => handlePickCep(e.target.value)}
                        onChange={(e) => setCEP(e.target.value)}
                        value={cep}
                        required
                        type="text"
                    />
                    <Input
                        placeholder="Rua"
                        className="bg-muted"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        type="text"
                    />
                    <div className="flex gap-3">
                        <Input
                            placeholder="Número"
                            className="bg-muted w-1/3"
                            required
                            type="text"
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                        />
                        <div className="relative w-2/3">
                            <Input
                                placeholder="Complemento"
                                className="bg-muted"
                                onChange={(e) => setComplement(e.target.value)}
                                value={complement}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                <span className="text-xs italic">Opcional</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Input
                            placeholder="Bairro"
                            className="bg-muted w-2/6"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                            type="text"
                        />
                        <Input
                            placeholder="Cidade"
                            className="bg-muted w-3/6"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            type="text"
                        />
                        <Input
                            placeholder="UF"
                            className="bg-muted w-1/6"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            type="text"
                            
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
