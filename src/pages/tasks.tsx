import { Layout } from '../components/shared/Layout'

const Tasks = () => {
    return <div>Tasks Page</div>
}

export default Tasks

const getLayout = (page: React.ReactElement) => {
    return (
        <Layout
            title="Tasks Page"
            metaData={{ name: 'description', content: 'Tasks Page with Next.JS' }}>
            {page}
        </Layout>
    )
}

Tasks.getLayout = getLayout
