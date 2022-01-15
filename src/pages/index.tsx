import { Layout } from '../components/shared/Layout'

const Home = () => {
    return <div>Home Page</div>
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
