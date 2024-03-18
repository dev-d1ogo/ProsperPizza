import Image from "next/image"
import { Button } from "../ui/button";
import { Flame, Pizza } from "lucide-react";
import { useEffect, useState } from "react";
import { cookies } from "next/headers";


const PizzaTitle = () => {
  const [cookieData, setCookieData] = useState('');

  useEffect(() => {
    const cookies = document.cookie;
    console.log(cookies)
    setCookieData(cookies);
  }, []);

  return (
    <div className=" mx-auto p-10 lg:h-[500px] flex items-center justify-center ">
      <div className="lg:grid flex  flex-col items-center lg:grid-cols-2 w-full h-full z-0 ">

        <div className="flex flex-col gap-3 p-10 justify-center items-center lg:items-start">
          <h1 className="text-5xl font-bold text-center tracking-wide">Prosper Pizza</h1>
          <h2 className="text-3xl text-center font-light">A melhor pizza da cidade!</h2>
          <p className="text-lg  font-light text-center text-gray-700 dark:text-gray-300">
            Com menos calorias e um preço especial
          </p>

          <a href="#menu" className="w-1/2">
            <Button >Compre agora</Button>
          </a>

          <div className="flex items-center mt-8">
            <div className="flex gap-3 items-center">
              <Flame size={38}/>

              <div className="block text-center leading-none">
                <strong className="text-2xl">600</strong>
                <p className="text-sm font-light">calorias</p>
              </div>

              <Pizza size={38} className="ml-3"/>

              <div className="block text-center leading-none">
                <strong className="text-2xl">220 G</strong>
                <p className="text-sm font-light">light</p>
              </div>
              
            </div>
          </div>
        </div>

        <div>
          <Image
            src={"/images/pizzaImage.png"}
            alt=""
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}

export default PizzaTitle