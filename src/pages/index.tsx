import PizzaCardContainer from "@/components/Home/PizzaCardContainer";
import PizzaTitle from "@/components/Home/PizzaContainer";

import AppLayout from "@/components/layouts/appLayout";

export default function Home() {
  return(
    <AppLayout>
      <div className="max-w-[1070px] mx-auto h-screen">
        <PizzaTitle/>
        <PizzaCardContainer/>
      </div>
    </AppLayout>
  )
}
