import Head from 'next/head'

import { Navbar } from './Navbar'

type MetaData = {
    name: string
    content: string
}

type LayoutProps = {
    title: string
    metaData?: MetaData
    children: React.ReactNode
}

export const Layout = ({ title, metaData, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={metaData?.name} content={metaData?.content} />
            </Head>
            <div className="bg-blue-300 h-screen flex flex-col">
                <Navbar />
                <main className="p-4 h-4/5 flex items-center justify-center">
                    {children}
                </main>
            </div>
        </>
    )
}
