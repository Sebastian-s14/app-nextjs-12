import { Layout } from '../components/shared/Layout'

const Users = () => {
    return <div>Users page</div>
}

export default Users

const getLayout = (page: React.ReactElement) => {
    return <Layout title="Users Page">{page}</Layout>
}

Users.getLayout = getLayout
