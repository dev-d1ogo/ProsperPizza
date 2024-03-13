import api from "@/lib/axios";

export interface SignUpBody{
    email?: string,
    user?: string,
    password: string
}

export const signUp = async({password, user, email}:SignUpBody) => {
await api.post('/user', {
        user,
        password, 
        email
    })
}