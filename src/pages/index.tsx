import { Layout } from '../components/shared/Layout'

const Home = () => {
    return (
        <div className="bg-red-300 flex flex-col items-center">
            <h2 className="text-3xl">Home Page</h2>
            <section className="bg-blue-600 w-full flex items-center justify-center p-2">
                <div className="h-52 w-52 bg-green-300"></div>
            </section>
        </div>
    )
}

export default Home

const getLayout = (page: React.ReactElement) => {
    return (
        <Layout
            title="Home Page"
            metaData={{ name: 'description', content: 'Home Page with Next.JS' }}>
            {page}
        </Layout>
    )
}

Home.getLayout = getLayout
