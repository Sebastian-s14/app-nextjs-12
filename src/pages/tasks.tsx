import { Layout } from '../components/shared/Layout'

const Tasks = () => {
    return <div>Tasks Page</div>
}

export default Tasks

const getLayout = (page: React.ReactElement) => {
    return <Layout title="Tasks Page">{page}</Layout>
}

Tasks.getLayout = getLayout
