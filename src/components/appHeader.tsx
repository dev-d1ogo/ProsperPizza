import { Pizza, ShoppingCart, User } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import PhoneCard from "./layouts/phoneCard";
import LocateCard from "./layouts/LocateCard";

export default function AppHeader() {
  return (
    <div className="border-b-2 border-muted h-20 flex justify-between items-center px-6">
      <div className="flex gap-3 ml-auto">
        <Pizza className="h-6 w-6" />
        <strong className="text-lg text-primary">Prosper Pizza</strong>
      </div>

      <div className="flex items-center gap-6 ml-auto ">
        <PhoneCard />
        <LocateCard />
        <ShoppingCart/>
        <User/>
        <ThemeToggle />
      </div>
    </div>
  );
}
