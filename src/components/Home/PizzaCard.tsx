import React from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'

export const PizzaCard = () => {
  return (
      <div className="card w-full h-full p-6 flex justify-center ">
          <div className="w-[300px] h-[450px]  flex  flex-col items-center gap-3 p-4 relative">
              <div className="w-[238px] h-[246px]">
                  <span className="w-[250px] h-[125px] absolute top-[92px] left-[110px] transform -translate-x-1/2 -translate-y-1/2 h-100 w-200 bg-red-500  rounded-full rounded-b-none -rotate-45"></span>
                  <img src="/pizza_calabresa.png" alt="" className="absolute" />
              </div>

              <h1 className="text-2xl font-bold text-pretty">Calabresa</h1>

              <p className="text-center text-lg font-light">
                  Calabresa, cebola, molho de tomate e queijo
              </p>

              <span className="font-bold text-xl">R$ 30,00</span>

              <Button className="flex gap-3">
                  <p className="font-bold text-sm">Compre agora</p>
                  <ShoppingCart size={18} />
              </Button>
          </div>
      </div>
  )
}
