import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next/types'
import axios, { AxiosResponse } from 'axios'

import { Layout } from '../../components/shared/Layout'
import { IUser } from '../../types/user.types'

export const getStaticProps: GetStaticProps<{ user: IUser }> = async ({ params }) => {
    let user: IUser = {} as IUser
    await axios(`http://jsonplaceholder.typicode.com/users/${params?.id}`).then(
        ({ data }: AxiosResponse<IUser>) => {
            user = data
        },
    )
    return {
        props: {
            user,
        },
    }
}

type Ids = {
    params: {
        id: string
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: Ids[] = []
    await axios('http://jsonplaceholder.typicode.com/users').then(
        ({ data }: AxiosResponse<IUser[]>) => {
            paths = data.map(({ id }) => ({
                params: {
                    id: id.toString(),
                },
            }))
        },
    )
    return {
        paths,
        fallback: false,
    }
}

const UserDetail = ({
    user: { id, name },
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout
            title={name}
            metaData={{ name: 'description', content: `Info about user: ${name}` }}>
            <div>
                User detail page {id}
                <p>{name}</p>
            </div>
        </Layout>
    )
}

export default UserDetail
