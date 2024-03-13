import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Locate } from "lucide-react"

const LocateCard = () => {
    return (
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Locate className="h-6 w-6 cursor-pointer" />
        </HoverCardTrigger>
        <HoverCardContent align="center" className="w-[500px] h-[280px]">
          <div className="h-full">
            <h1>Nossa localização</h1>
            <iframe
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.761157177824!2d-122.08444738517073!3d37.42227697979808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d33a31b1d%3A0xb6075ab81f3f16f3!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1637083057622!5m2!1sen!2sus"
            ></iframe>
          </div>
          
        </HoverCardContent>
      </HoverCard>
    );
}

export default LocateCard