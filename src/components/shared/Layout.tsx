import Head from 'next/head'

import { Navbar } from './Navbar'

type LayoutProps = {
    title: string
    children: React.ReactNode
}

export const Layout = ({ title, children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
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
