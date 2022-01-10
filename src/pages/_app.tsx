import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    // return <Component {...pageProps} />
    return getLayout(<Component {...pageProps} />)
}

export default MyApp
