import AuthLayout from "@/components/layouts/authLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";


import logoImg from '../../../public/logoProsperDark.png'
import { useTheme } from "next-themes";


import * as zod from "zod";
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from "sonner";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "@/myApi/login";
import Image from "next/image";

const LoginSchema = zod.object({
  user: zod.union([
    zod.string(),
    zod.string().email()
  ]),
  password: zod.string()
}).required()

type FormProps = zod.infer<typeof LoginSchema>


export default function index() {
  const router = useRouter()
  const { theme } = useTheme();

  const imagemEscura = "/images/dark/logoProsperDark.png";
  const imagemClara = "/images/light/logoProsperDefault.png";

  const image = theme === 'dark' ? imagemEscura : imagemClara

  const [searchParams, setSearchParams] = useState()


  const { register, handleSubmit, reset, watch} = useForm<FormProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      user: ''
    }
  })

  const handleSignIn = async (data:FormProps) =>{
    const {password, user } = data
    try {
      await signIn({password, user})
      window.location.href = ('/');
    } catch (error) {
      toast.error('Usuário não encontrado')
    }
    reset()
  }
  const user = watch('user')

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AuthLayout>
        <div className="flex justify-center dark:bg-black h-screen">
          <div className="md:grid md:grid-cols-2 gap-8  h-[500px] rounded-2xl">
            {theme && <img src={image} alt="Minha Imagem" width={500} height={300} />}
            <div className="p-6 flex flex-col justify-center gap-3">
              <h1 className="text-2xl mb-4">Bem vindo de volta ...</h1>
              <form className="space-y-2" onSubmit={handleSubmit(handleSignIn)}>
                <div>
                  <Label htmlFor="user">
                    Usuário / Email
                  </Label>
                </div>
                
                <Input type="text" id="user" {...register('user')} value={user}/>

                <div>
                  <Label htmlFor="password">
                    Senha
                  </Label>
                </div>
                
                <Input type="text" id="password" {...register('password')} />

                <Button className="w-full my-4" type="submit">
                  Entrar
                </Button>
              </form>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ainda não tem uma conta? Registre-se{" "}
                <Link
                  href="/auth/register"
                  className="underline underline-offset-2 text-red-600"
                >
                  clicando aqui
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}

