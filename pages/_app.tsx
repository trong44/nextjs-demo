import '@/styles/globals.css'
import '@/styles/bootstrap.min.css'
import type { AppProps } from 'next/app'
import Master from "@/components/layout/Master";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Master>
        <Component {...pageProps} />
      </Master>
  )
}
