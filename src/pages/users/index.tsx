import Link from 'next/link'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import axios, { AxiosResponse } from 'axios'

import { Layout } from '../../components/shared/Layout'
import { IUser } from '../../types/user.types'

export const getStaticProps: GetStaticProps<{ users: IUser[] }> = async () => {
    let users: IUser[] = []
    await axios('http://jsonplaceholder.typicode.com/users').then(
        ({ data }: AxiosResponse<IUser[]>) => (users = data),
    )

    return {
        props: {
            users,
        },
    }
}

const Users = ({ users }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div className="w-1/2 h-full">
            <h2 className="bg-purple-700 flex items-center justify-center text-white text-2xl font-bold">
                My Users
            </h2>
            <ul className="bg-green-500 flex flex-col overflow-y-scroll h-full">
                {users.map(({ id, name }) => (
                    <li key={id} className="bg-green-200 p-2 m-5">
                        <Link href={`/users/${id}`}>
                            <a>{name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users

const getLayout = (page: React.ReactElement) => {
    return (
        <Layout
            title="Users Page"
            metaData={{
                name: 'description',
                content: 'List of users from jsonplaceholder',
            }}>
            {page}
        </Layout>
    )
}

Users.getLayout = getLayout
