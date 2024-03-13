import Image from "next/image";
import logoDark from '../assets/logoProsperDark.png'
import logoDefault from '../assets/ProsperLogo.png'
import { useTheme } from "next-themes";
export function LogoImage(){
    const {theme} = useTheme()
    return(
        <div>
            <Image src={theme === 'dark' ? logoDark : logoDefault} alt=""></Image>
        </div>
        
    )
}