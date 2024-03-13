import AuthLayout from "@/components/layouts/authLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";


import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signUp } from "@/myApi/signUp";
import { useTheme } from "next-themes";

const RegisterSchema = zod.object({
  user: zod.string(),
  email: zod.string().email('Email invalido'),
  password: zod.string().min(6).refine(value =>{
    return {message: 'A senha nao deve conter menos que 6 caracteres'}
  }),
  passwordConfirm: zod.string().min(6)
 
}).superRefine(({password, passwordConfirm}, context) => {
  if(password !== passwordConfirm){
    context.addIssue({
      code: 'custom',
      message: 'As senhas devem ser iguais'
    })
  }

  else if(password.length < 6){
    context.addIssue({
      code: 'custom',
      message: 'A senha deve conter 6 caracteres'
    })
  }
})


type FormProps = zod.infer<typeof RegisterSchema>



export default function index() {
  const router = useRouter();
  const { theme } = useTheme();

  const imagemEscura = "/images/dark/logoProsperDark.png";
  const imagemClara = "/images/light/logoProsperDefault.png";

  const image = theme === "dark" ? imagemEscura : imagemClara;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleSignUp = async (data: FormProps) => {
    const { user, email, password } = data;
    try {
      await signUp({ password, user, email }); // Registrando User
      router.push({
        pathname: "/auth/signIn",
        query: { user: user },
      });
    } catch (error) {
      toast.error("Tente novamente!");
    }
    reset();
  };

  const errorsMessage = Object.entries(errors);

  if (errorsMessage.length != 0) {
    errorsMessage.map(([_key, value]) => {
      if (value.type === "custom") {
        toast.error(value.message);
      }
      // toast.error(valor.message)
    });
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <AuthLayout>
        <div className="flex justify-center dark:bg-black h-screen">
          <div className="md:grid md:grid-cols-2 gap-8  h-[500px] rounded-2xl">
            <div>
              {theme && <img src={image} alt="Minha Imagem" width={500} height={300} />}
              
              
            </div>
            <div className="p-6 flex flex-col justify-center gap-3">
              <h1 className="text-2xl mb-4">
                Seja bem vindo a nossa pizzaria ...
              </h1>
              <form className="space-y-2" onSubmit={handleSubmit(handleSignUp)}>
                <div>
                  <Label htmlFor="user">Usuário</Label>
                </div>

                <Input type="text" id="user" {...register("user")} />

                <div>
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input type="email" id="email" {...register("email")} />

                <div>
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input type="text" id="password" {...register("password")} />

                <div>
                  <Label htmlFor="passwordConfirm">Confirme a senha</Label>
                </div>
                <Input
                  type="text"
                  id="passwordConfirm"
                  {...register("passwordConfirm")}
                />

                <Button className="w-full my-4" type="submit">
                  Entrar
                </Button>
              </form>

              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Já tem uma conta? Entre{" "}
                <Link
                  href="/auth/signIn"
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

