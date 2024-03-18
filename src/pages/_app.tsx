import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from 'sonner'
import { ThemeProvider } from "@/components/theme/theme-provider";
import { useTheme } from "next-themes";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { UserProvider } from "@/context/UserContext";



export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
      >
          <UserProvider>
              <ProductProvider>
                  <CartProvider>
                      <Component {...pageProps} />
                  </CartProvider>
              </ProductProvider>

              <Toaster richColors closeButton />
          </UserProvider>
      </ThemeProvider>
  )
}
