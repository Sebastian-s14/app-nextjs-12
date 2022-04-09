import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import client from '../graphql-client/apollo-client'
// import type { NextPage } from 'next/types'

// type NextPageWithLayout = NextPage & {
//     getLayout?: (page: React.ReactElement) => React.ReactNode
// }

// type AppPropsWithLayout = AppProps & {
//     Component: NextPageWithLayout
// }

// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//     const getLayout = Component.getLayout ?? ((page) => page)
//     // return <Component {...pageProps} />
//     return getLayout(<Component {...pageProps} />)
// }

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
