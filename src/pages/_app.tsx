import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from 'sonner'
import { ThemeProvider } from "@/components/theme/theme-provider";
import { useTheme } from "next-themes";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      
    >
      <Component {...pageProps} />
      
      <Toaster richColors closeButton />
    </ThemeProvider>
  );
}
