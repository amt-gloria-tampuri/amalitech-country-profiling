import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeContextProvider } from '../../context/Theme'
import { CountryDataProvider } from '../../context/CountryContext'

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeContextProvider>
    <CountryDataProvider>
    <Component {...pageProps} />
    </CountryDataProvider>
  </ThemeContextProvider>
}
