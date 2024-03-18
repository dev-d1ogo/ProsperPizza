import { Pizza, ShoppingCart, User } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import PhoneCard from "./layouts/phoneCard";
import LocateCard from "./layouts/LocateCard";
import { UserDetails } from "./Home/UserDetails";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContenxt } from "@/context/CartContext";
import { GetServerSideProps } from "next";


export default function AppHeader() {
  const {cart, cartAmount} = useContext(CartContenxt)
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // Verificar se estamos no lado do cliente
    if (typeof window !== 'undefined') {
      // Atualizar a quantidade do carrinho com base nos dados do contexto
      if (cart && cart.length > 0) {
        setCartQuantity(cartAmount);
      } else{
        setCartQuantity(0)
      }
    }
  }, [cart]);
 
  return (
    <div className="border-b-2 border-muted h-20 flex justify-between items-center px-6">
      <div className="flex gap-3 ml-auto">
        <Pizza className="h-6 w-6" />
        <Link href={'/'}>
          <strong className="text-lg text-primary">Prosper Pizza</strong>
        </Link>
        
      </div>

      <div className="flex items-center gap-6 ml-auto ">
        <PhoneCard />
        <LocateCard />
        <Link href={'/orders'} >
          <div className="relative h-10 w-10">
            <ShoppingCart className="absolute top-1/2 left-1/2 -translate-y-1/2  -translate-x-1/2 "/>
            {cartQuantity > 0 && <span className="absolute top-0 right-0 h-1 w-1 font-semibold text-sm text-primary ">{cartQuantity}</span>}
          </div>
        </Link>
        
        <UserDetails/>
        <ThemeToggle />
      </div>
    </div>
  );
}

