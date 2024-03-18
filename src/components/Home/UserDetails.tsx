import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User as UserProps, useUser } from '@/context/UserContext'
import api from '@/lib/axios'
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'





export const UserDetails = () => {
    const {user, logout} = useUser()
    const router = useRouter()

    const handleLogout = async () => {
        logout()
        await api.post('/user/logout')
        router.replace('/auth/signIn')
        
    }

    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <strong className="font-semibold mr-1">Usuario: </strong>
                    <p>{user?.username}</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <strong className="font-semibold mr-1">Email: </strong>
                    <p>{user?.email}</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button onClick={() => {
                        logout()
                        handleLogout()
                    }}>
                        <div className="flex items-center gap-3 w-full">
                            <p className="text-primary">Sair</p>
                            <LogOut color="red" size={16} />
                        </div>
                    </button>
                </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
