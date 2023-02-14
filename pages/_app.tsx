import '@/styles/globals.css'
import '@/styles/bootstrap.min.css'
import '@/styles/customize-boostrap.css'
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

import type { AppProps } from 'next/app'
import Master from "@/components/layout/Master";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Master>
        <Component {...pageProps} />
      </Master>
  )
}
