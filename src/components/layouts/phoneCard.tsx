import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Phone } from "lucide-react"

const PhoneCard = () => {
    return (
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Phone className="h-6 w-6 cursor-pointer" />
        </HoverCardTrigger>
        <HoverCardContent >
          +55 79 99999-9999
        </HoverCardContent>
      </HoverCard>
    );
}

export default PhoneCard