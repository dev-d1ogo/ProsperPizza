import api from "@/lib/axios";

export interface SignInBody{
    user?: string,
    password: string
}

export const signIn = async({password, user}:SignInBody) => {
    await api.post('/user/login', {
        user,
        password, 
    })
}